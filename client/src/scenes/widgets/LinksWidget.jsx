import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import LinksWrapper from "../../components/LinksWrapper";
import LinkWidget from "./LinkWidget";
import { LinkContext } from "../../context/LinkContext";
import { useContext } from "react";
import { Typography } from "@mui/material";

const LinksWidget = ({ searchQuery }) => {
  const token = useSelector((state) => state.token);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
  const { refresh } = useContext(LinkContext);

  const getLinks = async () => {
    const response = await fetch("https://link-saver-backend.vercel.app/links", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setLinks(data.reverse()); // shows latest added first
  };

  useEffect(() => {
    getLinks();
  }, [refresh]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = (linkId) => {
    navigate(`/link/${linkId}`);
  };

  const deleteLink = async (_id) => {
    await fetch(`https://link-saver-backend.vercel.app/links/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setLinks(links.filter((link) => link._id !== _id)); // Remove the deleted link from the state
  };

  const filteredLinks = links.filter((link) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      link.title.toLowerCase().includes(lowerCaseSearchQuery) ||
      link.link.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            backgroundColor: "#21212b",
            borderRadius: "2rem",
            padding: "0.5rem 1rem",
          }}
        >
          <Typography variant="h5" color="white">
            No. of Links: {filteredLinks.length} links
          </Typography>
        </div>

      </div>

      {filteredLinks.map(({ _id, link, title }) => (
        <LinksWrapper key={_id}>
          <FlexBetween>
            <LinkWidget
              link={link}
              title={title}
              onClick={() => handleClick(_id)}
            />
            <IconButton>
              <Tooltip title="Delete" arrow>
                <DeleteOutlineOutlined
                  fontSize="large"
                  sx={{ margin: "1rem", color: "white" }}
                  onClick={() => deleteLink(_id)}
                />
              </Tooltip>
            </IconButton>
          </FlexBetween>
        </LinksWrapper>
      ))}
    </>
  );
};

export default LinksWidget;
