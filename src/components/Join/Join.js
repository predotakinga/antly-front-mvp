import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  TextField,
  Paper,
  Grid,
  Avatar,
  Typography,
  Modal,
} from "@mui/material";
import { CheckCircle, LockOutlined } from "@mui/icons-material";
import {
  Container,
  PaperWrapper,
  AvatarContent,
  ButtonContent,
  LinkContent,
} from "./JoinElements";

const Join = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [modalState, setModalState] = useState(false);

  const data = {
    username: username,
    password: password,
    name: name,
    surname: surname,
    telephone: telephone,
    email: email,
  };

  const handleUsernameChange = (event) => {
    setUsername(event.currentTarget.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleTelephoneChange = (event) => {
    setTelephone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    authoriseUser();
  };

  const authoriseUser = () => {
    try {
      axios
        .post(`https://antly-backend.herokuapp.com/auth/signup`, data)
        .then((res) => {
          setModalState(true);
          console.log(res);
        })
        .catch((err) => {
          setError(err.response.data.message);
          console.log(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const ModalContent = () => {
    return (
      <>
        <Modal
          open={modalState}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper
            sx={{
              padding: 5,
              height: "30vh",
              width: "45vh",
              margin: "10px auto",
              boxShadow: 14,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "green",
                marginBottom: "5%",
              }}
            >
              <CheckCircle />
            </Avatar>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Your account has been created successfully!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Click <LinkContent to="/login">sign in</LinkContent> to get
              started!
            </Typography>
          </Paper>
        </Modal>
      </>
    );
  };

  return (
    <Container>
      <Grid>
        <PaperWrapper elevation={10}>
          <Grid align="center" columnSpacing={5}>
            <AvatarContent>
              <LockOutlined />
            </AvatarContent>
            <h2>Sign up</h2>
          </Grid>
          {error !== ""
            ? error.map((item) => (
                <Typography
                  sx={{
                    color: "#AB464F",
                    whiteSpace: "pre-line",
                    fontSize: 12,
                  }}
                >
                  {item}
                </Typography>
              ))
            : ""}
          <TextField
            label="Username"
            placeholder="Username"
            fullWidth
            variant="standard"
            onChange={handleUsernameChange}
            value={username}
          />
          <TextField
            label="Name"
            placeholder="Name"
            fullWidth
            variant="standard"
            onChange={handleNameChange}
            value={name}
          />
          <TextField
            label="Surname"
            placeholder="Surname"
            fullWidth
            variant="standard"
            onChange={handleSurnameChange}
            value={surname}
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
          <TextField
            label="Telephone number"
            placeholder="+44 xxxx xxxxx"
            inputProps={{
              maxLength: 9,
              minLength: 9,
            }}
            fullWidth
            type="Number"
            variant="standard"
            onChange={handleTelephoneChange}
            value={telephone}
          />
          <TextField
            label="Email"
            placeholder="Email"
            fullWidth
            variant="standard"
            onChange={handleEmailChange}
            value={email}
          />
          <ButtonContent
            type="submit"
            fullWidth
            variant="contained"
            onClick={submitHandler}
          >
            Sign up
          </ButtonContent>
          <Typography>
            Do you have an account?{" "}
            <LinkContent to="/login">Sign in</LinkContent>
          </Typography>
          <ModalContent />
        </PaperWrapper>
      </Grid>
    </Container>
  );
};

export default Join;
