import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import AddCourse from "../components/AddCourse/AddCourse";
import Feed from "../components/Feed/Feed";
import Navbar from "../components/Navbar/Navbar";
import Rightbar from "../components/Rightbar/Rightbar";
import Sidebar from "../components/SideBar/Sidebar";
import { theme } from "../theme";

const CreateOffer = () => {
  const [mode, setMode] = useState("light");

  return (
    <ThemeProvider theme={theme(mode)}>
      <Box bgcolor="background.default" color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <AddCourse />
          <Rightbar />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default CreateOffer;
