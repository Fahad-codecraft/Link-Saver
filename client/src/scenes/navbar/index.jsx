// Navbar.js
import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  useMediaQuery,
  InputBase,
} from "@mui/material";
import { Menu as MenuIcon, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Navbar = ({showSearchInput, handleSearch }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const background = "#333333";
  const alt = "#181820";

  const fullName = `${user.firstName} ${user.lastName}`;

  const ProfileCircle = ({ fullName }) => {
    const firstLetter = fullName.charAt(0).toUpperCase();

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          backgroundColor: "black",
          outline: "3px solid gray",
          transition: "outline-color 0.2s",
          cursor: "pointer",
          "&:hover": {
            outlineColor: "#ffffff",
          },
        }}
      >
        <Typography color="white" fontWeight="400" fontSize="18px">
          {firstLetter}
        </Typography>
      </Box>
    );
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          className="name-link"
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="#e52b64"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: "#ffb498",
              cursor: "pointer",
            },
          }}
        >
          Link Saver
        </Typography>
        {/* SEARCH INPUT */}
        {showSearchInput && (
      <Box
        display="flex"
        alignItems="center"
        ml="10px"
        sx={{
          backgroundColor: "#36363a",
          borderRadius: "2rem",
          padding: "0.5rem 1rem",
        }}
      >
        <InputBase
          type="text"
          placeholder="Search Links"
          onChange={handleSearch}
          sx={{
            width: "200%",
            backgroundColor: "#36363a",
            borderRadius: "2rem",
            "& input": {
              color: "white",
            },
          }}
        />
      </Box>
      )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <ProfileCircle fullName={fullName} />
          <IconButton onClick={handleProfileMenuOpen}>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
          </Menu>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close sx={{ color: "white" }} />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <ProfileCircle fullName={fullName} />
            <Box
              width="100px"
              sx={{ cursor: "pointer" }}
              onClick={() => dispatch(setLogout())}
            >
              <Typography color="white">Log Out</Typography>
            </Box>
          </FlexBetween>
        </Box>
      )}

      
    </FlexBetween>
  );
};

export default Navbar;
