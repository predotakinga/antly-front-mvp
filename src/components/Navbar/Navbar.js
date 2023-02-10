import { EmojiNature } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");

  const getUsername = () => {
    const token = localStorage.getItem("token");
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user = JSON.parse(rawPayload);
    setUser(user.username);
  };

  const logOut = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <AppBar position="sticky" style={{ background: "#438482" }}>
      <StyledToolBar>
        <div style={{ display: "inline-flex" }}>
          <img
            src={require("../../assets/ant.png")}
            style={{ marginRight: "10%" }}
          />
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block " } }}
          >
            ANT.LY
          </Typography>
        </div>
        <Icons>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://secure.gravatar.com/avatar/2dc0925970cf49d8eba8e4cbc6b50923?s=150&r=g&d=https://www.ieeer10.org/wp-content/plugins/userswp/assets/images/no_profile.png"
            onClick={(e) => setOpen(true)}
          />
          <Typography variant="span">{user}</Typography>
        </Icons>
      </StyledToolBar>
      <UserBox>
        <Avatar
          sx={{ width: 30, height: 30 }}
          src="https://secure.gravatar.com/avatar/2dc0925970cf49d8eba8e4cbc6b50923?s=150&r=g&d=https://www.ieeer10.org/wp-content/plugins/userswp/assets/images/no_profile.png"
          onClick={(e) => setOpen(true)}
        />
        <Typography variant="span">{user}</Typography>
      </UserBox>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem component="a" href="/createOffer">
          Create Offer
        </MenuItem>
        <MenuItem component="a" href="/myoffers">
          Added Courses{" "}
        </MenuItem>
        <MenuItem component="a" href="/Favourites">
          Favourite Courses{" "}
        </MenuItem>
        <MenuItem onClick={logOut} component="a" href="/login">
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
