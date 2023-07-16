import { Box } from "@mui/material";
import Navbar from "../navbar";
import PutLinkWidget from "../widgets/InputWidget";
import LinksWidget from "../widgets/LinksWidget";
import { useState } from "react";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <Box>
            <Navbar handleSearch={handleSearch} showSearchInput={true}/>
            <Box>
                <PutLinkWidget />
                <LinksWidget searchQuery={searchQuery} />
            </Box>
        </Box>
    );
};

export default HomePage;
