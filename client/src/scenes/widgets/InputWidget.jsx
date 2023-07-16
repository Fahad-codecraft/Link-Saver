import { InputBase, Button } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useSelector } from "react-redux";
import {motion, AnimatePresence} from "framer-motion"

import { useContext } from "react";
import { LinkContext } from "../../context/LinkContext";
const PutLinkWidget = () => {
  const [link, setLink] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token); // eslint-disable-next-line
  const [links, setLinks] = useState([]);
  const { toggleRefresh } = useContext(LinkContext);

  const handleLink = async () => {
    const data = {
      userId: _id,
      link: link,
    };

    const response = await fetch(`https://link-saver-backend.vercel.app/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const links = await response.json();
    setLinks({ links });
    toggleRefresh();
    setLink("");
    handleCancel();
  };

  const handlePasteFromClipboard = async () => {
    const clipboardText = await navigator.clipboard.readText();
    setLink(clipboardText);
  };

  const handleAddLink = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setLink("");
  };

  if (!showForm) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: "#21212b",
          margin: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        <Button
          onClick={handleAddLink}
          sx={{
            color: "white",
            backgroundColor: "purple",
            borderRadius: "3rem",
            margin: "1rem",
          }}
        >
          Add Link
        </Button>
      </div>
    );
  }

  return (
    <WidgetWrapper margin="1rem">
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <FlexBetween
              gap="1.5rem"
              flexDirection="column"
              alignItems="center"
            >
              <InputBase
                type="text"
                placeholder="Put your Youtube Link"
                onChange={(e) => setLink(e.target.value)}
                value={link}
                sx={{
                  width: "50%",
                  backgroundColor: "#36363a",
                  borderRadius: "2rem",
                  padding: "1rem 2rem",
                  "& input": {
                    color: "white",
                  },
                }}
              />
              <FlexBetween>
                <Button
                  disabled={!link}
                  onClick={handleLink}
                  sx={{
                    color: "white",
                    backgroundColor: "purple",
                    borderRadius: "3rem",
                    margin: "1rem",
                  }}
                >
                  ADD
                </Button>
                <Button
                  onClick={handlePasteFromClipboard}
                  sx={{
                    color: "white",
                    backgroundColor: "purple",
                    borderRadius: "3rem",
                    margin: "1rem",
                  }}
                >
                  Paste from Clipboard
                </Button>
                <Button
                  onClick={handleCancel}
                  sx={{
                    color: "white",
                    backgroundColor: "red",
                    borderRadius: "3rem",
                  }}
                >
                  Cancel
                </Button>
              </FlexBetween>
            </FlexBetween>
          </motion.div>
        )}
      </AnimatePresence>
    </WidgetWrapper>
  );
};

export default PutLinkWidget;
