import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LinkWrapper from "../../components/LinkWrapper";
import { Typography, Button } from "@mui/material";
import Navbar from "../navbar"
// import { DeleteOutlineOutlined } from "@mui/icons-material";
import './style.css'

const LinkPage = () => {
	const token = useSelector((state) => state.token);
	const [link, setLink] = useState(null);
	const { id } = useParams()
	// const [links, setLinks] = useState([])
	const navigate = useNavigate();

	const getLink = async () => {
		const response = await fetch(`https://link-saver-backend.vercel.app/links/${id}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		setLink(data);
	};

	useEffect(() => {
		getLink();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	const deleteLink = async () => {
		await fetch(`https://link-saver-backend.vercel.app/links/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		});
		navigate("/home")
	};

	if (!link) {

		return (
			<>
				<Navbar showSearchInput={false}/>
				<Typography variant="h4" color="white">Loading...</Typography>
			</>
		);
	}

	return (
		<>
			<Navbar />
			<div className="title-contain">
				<h1>Title: {link.title}</h1>
			</div>

			<LinkWrapper display="flex" justifyContent="center">
				<Typography fontSize="1rem" color="#ffffff">
					Link: <a href={link.link}>{link.link}</a>
				</Typography>
			</LinkWrapper>
			<LinkWrapper display="flex" justifyContent="center">
				<Typography fontSize="0.9rem" color="#ffffff">
					Channel: {link.channel}
				</Typography >
				<Typography fontSize="0.9rem" ml="1rem" color="#ffffff">
					Duration: {link.duration}
				</Typography>
			</LinkWrapper>
			<div className="button-container">
				<Button
					onClick={() => deleteLink(id)}
					sx={{
						color: "red",
						"&:hover": {
							backgroundColor: "red",
							color: "white",
						},
					}}>
					DELETE
				</Button>
			</div>
		</>
	);
};

export default LinkPage;
