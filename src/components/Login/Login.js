import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import { TextField, Grid, Typography } from "@mui/material";
import {
  Container,
  PaperWrapper,
  AvatarContent,
  ButtonContent,
  LinkContent,
} from "./LoginElements";

const Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const data = {
    username: username,
    password: password,
  };

  const handleUsernameChange = (event) => {
    setUsername(event.currentTarget.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    authoriseUser();
  };

  const saveToken = (value) => {
    try {
      localStorage.setItem("token", JSON.stringify(value));
    } catch (err) {
      console.log(err);
    }
  };

  const authoriseUser = () => {
    try {
      axios
        .post(`https://antly-backend.herokuapp.com/auth/signin`, data)
        .then((res) => {
          saveToken(res.data.accessToken);
          window.location.reload(false);
          return navigate("/");
        })
        .catch((error) => {
          setError("Wprowadzone dane są nieprawidłowe");
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Grid>
        <PaperWrapper elevation={10}>
          <Grid align="center" columnSpacing={5}>
            <AvatarContent>
              <LockOutlined />
            </AvatarContent>
            <h2>Sign in</h2>
          </Grid>
          {error !== "" ? (
            <Typography
              sx={{
                color: "#AB464F",
                whiteSpace: "pre-line",
                fontSize: 12,
              }}
            >
              {error}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            label="Username"
            placeholder="Username"
            fullWidth
            variant="standard"
            onChange={handleUsernameChange}
            value={username}
          />
          <TextField
            label="Password"
            placeholder="Password"
            fullWidth
            type="password"
            variant="standard"
            onChange={handlePasswordChange}
            value={password}
          />
          <ButtonContent
            type="submit"
            fullWidth
            variant="contained"
            onClick={submitHandler}
          >
            Sign in
          </ButtonContent>
          <Typography>
            Do you have an account?{" "}
            <LinkContent to="/signup">Sign up</LinkContent>
          </Typography>
        </PaperWrapper>
      </Grid>
    </Container>
  );
};

export default Login;
