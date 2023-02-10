import {
  AccountBox,
  Home,
  LibraryBooks,
  ModeNight,
  School,
  Settings,
  Star,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";
import { LinkContent } from "./SidebarElements";

const Sidebar = ({ mode, setMode }) => {
  return (
    <Box
      flex={0.75}
      p={2}
      sx={{ minHeight: "100vh", display: { xs: "none", sm: "block " } }}
    >
      <List>
        <LinkContent to="/">
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home sx={{ color: "#AB464F" }} />
              </ListItemIcon>
              <ListItemText secondary="Home" />
            </ListItemButton>
          </ListItem>
        </LinkContent>
        <LinkContent to="/createOffer">
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <AddCircleIcon sx={{ color: "#AB464F" }} />
              </ListItemIcon>
              <ListItemText secondary="Create offer" />
            </ListItemButton>
          </ListItem>
        </LinkContent>
        <LinkContent to="/myoffers">
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <School sx={{ color: "#AB464F" }} />
              </ListItemIcon>
              <ListItemText secondary="Added courses" />
            </ListItemButton>
          </ListItem>
        </LinkContent>
        <LinkContent to="/Favourites">
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Star sx={{ color: "#AB464F" }} />
              </ListItemIcon>
              <ListItemText secondary="Favourite courses" />
            </ListItemButton>
          </ListItem>
        </LinkContent>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#home">
            <ListItemIcon>
              <ModeNight sx={{ color: "#AB464F" }} />
            </ListItemIcon>
            <Switch
              onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
