import Links from "../models/Links.js";
import asyncHandler from "express-async-handler";
import axios from "axios";

export const getLinks = asyncHandler(async (req, res) => {
    const links = await Links.find({ userId: req.user.id });
    res.status(200).json(links);
});

export const getLink = asyncHandler(async (req, res) => {
    const link = await Links.findById(req.params.id);
    if (!link) {
        res.status(404);
        throw new Error("Link not found");
    }
    res.status(200).json(link);
});

export const createLink = asyncHandler(async (req, res) => {
    const { link } = req.body;

    const { videoTitle, channelTitle, videoDuration } = await getYouTubeVideoDetails(link);
    const createdLink = await Links.create({
        link,
        title: videoTitle,
        channel: channelTitle,
        duration: videoDuration,
        userId: req.user.id,
    });
    res.status(201).json(createdLink);
});

export const deleteLink = asyncHandler(async (req, res) => {
    const link = await Links.findById(req.params.id);
    if (!link) {
        res.status(404);
        throw new Error("Link not found");
    }

    if (link.userId.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update links");
    }

    await Links.deleteOne({ _id: req.params.id });
    res.status(200).json(link);
});

const getYouTubeVideoDetails = async (link) => {
    const videoId = extractYouTubeVideoId(link);
    if (!videoId) {
        throw new Error("Invalid YouTube link");
    }

    const apiKey = process.env.YTAPIKEY;
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const videoDetails = response.data.items[0];
        const videoTitle = videoDetails.snippet.title;
        const channelTitle = videoDetails.snippet.channelTitle;
        const videoDuration = convertDurationFormat(videoDetails.contentDetails.duration);

        return { videoTitle, channelTitle, videoDuration };

    } catch (error) {
        throw new Error("Failed to fetch YouTube video details");
    }
};

const convertDurationFormat = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
};

const padZero = (value) => {
    return value.toString().padStart(2, "0");
};

const extractYouTubeVideoId = (link) => {
    const patterns = [
        /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([^&]+)/,
        /^(https?:\/\/)?(www\.)?youtu\.be\/([^?]+)/,
        /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([^&]+)&t=\d+s$/
    ];

    for (const pattern of patterns) {
        const match = link.match(pattern);
        if (match && match[3]) {
            return match[3];
        }
    }

    return null;
};
