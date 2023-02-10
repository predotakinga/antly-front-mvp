import { createTheme } from "@mui/material";

export const theme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light" && {
        background: {
          default: "#eff0e6",
          paper: "#f7f7f2",
        },
        AppBar: {
          background: {
            default: "#438482",
          },
        },
      }),
      text: {
        ...(mode === "light"
          ? {
              primary: "#000",
            }
          : {
              primary: "#fff",
            }),
      },
    },
  });
