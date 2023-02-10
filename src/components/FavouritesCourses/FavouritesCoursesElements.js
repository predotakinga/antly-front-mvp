import { styled } from "@mui/system";
import { Link } from "react-router-dom";

import { Button, Box, Card, Typography } from "@mui/material";

export const Container = styled(Box)({
  spacing: 8,
  height: "100%",
  overflow: "hidden",
  flexWrap: "wrap",
  display: "flex",
});

export const CardWrapper = styled(Card)({
  maxWidth: 280,
  marginRight: "20px",
  marginBottom: "20px",
  minWidth: 280,
  minHeight: "400px",
  borderColor: "#dbdbdb",
  justifyContent: "space-between",
  flexDirection: "column",
  display: "flex",
});

export const Subject = styled(Typography)({
  fontSize: 12,
  color: "#2e7d31",
  marginBottom: "10px",
});

export const CardProps = styled(Typography)({
  fontSize: 12,
  color: "#2e7d31",
  marginTop: "6px",
});

export const ButtonContent = styled(Button)({
  backgroundColor: "#bf5e42",
  color: "white",
  width: "100%",
  "&:hover": {
    backgroundColor: "#7d2d2d",
  },
});

export const LinkContent = styled(Link)({
  color: "white",
  textDecoration: "none",
});
