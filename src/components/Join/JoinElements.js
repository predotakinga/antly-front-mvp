import { styled } from "@mui/system";
import { Link } from "react-router-dom";

import { Paper, Avatar, Button } from "@mui/material";

export const Container = styled("div")({
  position: "fixed",
  width: "100%",
  top: 0,
  left: 0,
  backgroundColor: "#eff0e6",
  height: "100%",
});

export const PaperWrapper = styled(Paper)({
  padding: 20,
  height: "80vh",
  width: 340,
  margin: "20px auto",
});

export const AvatarContent = styled(Avatar)({
  backgroundColor: "#C4824C",
});

export const ButtonContent = styled(Button)({
  margin: "38px 0",
  backgroundColor: "#438482",
  "&:hover": {
    background: "#265e5c",
  },
});

export const LinkContent = styled(Link)({
  color: "#AB464F",
  textDecoration: "none",
});
