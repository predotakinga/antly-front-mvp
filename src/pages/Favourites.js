import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useState } from "react";
import FavouritesCourses from "../components/FavouritesCourses/FavouritesCourses";
import Navbar from "../components/Navbar/Navbar";
import Rightbar from "../components/Rightbar/Rightbar";
import Sidebar from "../components/SideBar/Sidebar";
import { theme } from "../theme";
import React from "react";

const Favourites = () => {
  const [mode, setMode] = useState("light");

  return (
    <ThemeProvider theme={theme(mode)}>
      <Box bgcolor="background.default" color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <FavouritesCourses />
          <Rightbar />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Favourites;
