import { styled } from "@mui/system";
import { Link } from "react-router-dom";

import {
  Button,
  Box,
  Card,
  Typography,
  Paper,
  TextField,
  Autocomplete,
  Avatar,
} from "@mui/material";

export const Container = styled(Box)({
  height: "100%",
  display: "grid",
});

export const PaperContent = styled(Paper)({
  textAlign: "center",
  height: "100vh",
  width: "100%",
  margin: "5px auto",
  boxShadow: 8,
});

export const ImageWrapper = styled(Box)({
  float: "left",
  overflow: "hidden",
  position: "relative",
  width: "25%",
  height: "100%",
  background: "green",
});

export const FormWrapper = styled(Box)({
  width: "70%",
  float: "right",
  height: "100%",
  paddingRight: "20px",
});

export const TitleWrapper = styled(Paper)({
  background: "#C2C3A5",
  marginTop: "50px",
  marginBottom: "40px",
  height: "8vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Title = styled(Typography)({
  padding: 3,
  textShadow: "1px black",
});

export const Error = styled(Typography)({
  color: "#bf5e42",
  whiteSpace: "pre-line",
  fontSize: 12,
});

export const TextFieldContent = styled(TextField)({
  marginTop: 3,
  "& p": {
    color: "#bf5e42",
  },
});

export const Search = styled("div")({
  padding: "0 10px",
  width: "auto",
  display: "flex",
  alignItems: "center",
  marginTop: 10,
});

export const AutocompleteContent = styled(Autocomplete)({
  width: 250,
  maxHeight: 50,
  borderColor: "red",
});

export const ButtonContent = styled(Button)({
  margin: "38px 0",
  backgroundColor: "#C4824C",
  width: 200,
  color: "white",
});

export const AvatarContent = styled(Avatar)({
  backgroundColor: "#7DDE92",
});

export const LinkContent = styled(Link)({
  textDecoration: "none",
  color: "#bf5e42",
});
