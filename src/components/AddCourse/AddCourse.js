import { Paper, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  AutocompleteContent,
  AvatarContent,
  ButtonContent,
  Container,
  Error,
  FormWrapper,
  ImageWrapper,
  LinkContent,
  PaperContent,
  Search,
  TextFieldContent,
  Title,
  TitleWrapper,
} from "./AddCourseElements";
import {
  locationsProps,
  rangesProps,
  subjectsProps,
} from "../Feed/autoCompleteProps";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [descriptionShort, setDescriptionShort] = useState("");
  const [descriptionLong, setDescriptionLong] = useState("");
  const [subject, setSubject] = useState("");
  const [range, setRange] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [modalState, setModalState] = useState(false);
  const [error, setError] = useState("");

  const addOffer = () => {
    let token = localStorage.getItem("token");
    try {
      axios
        .post(
          `https://antly-backend.herokuapp.com/offers/`,
          {
            title: title,
            descriptionShort: descriptionShort,
            descriptionLong: descriptionLong,
            subject: subject,
            price: parseInt(price),
            location: location,
            range: range,
            imageUrl: imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token.replaceAll('"', "")}`,
            },
          }
        )
        .then((res) => {
          setModalState(true);
        })
        .catch((err) => {
          setError(err.response.data.message);
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
          sx={{}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper
            sx={{
              padding: 5,
              height: "25vh",
              width: "35vh",
              margin: "10px auto",
              boxShadow: 14,
            }}
          >
            <AvatarContent>
              <CheckCircleIcon />
            </AvatarContent>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Your offer has been created successfully!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <LinkContent to="/">
                Click here to come back to home page
              </LinkContent>
            </Typography>
          </Paper>
        </Modal>
      </>
    );
  };

  return (
    <Container flex={4} p={{ xs: 0, md: 2 }}>
      <PaperContent>
        <ImageWrapper>
          <img
            style={{ objectFit: "cover" }}
            src={require("../../assets/bg-img.jpeg")}
          />
        </ImageWrapper>
        <FormWrapper>
          <TitleWrapper>
            <Title
              id="modal-modal-title"
              variant="h10"
              color="white"
              component="h1"
            >
              CREATE OFFER
            </Title>
          </TitleWrapper>
          {error !== "" ? error.map((item) => <Error>{item}</Error>) : ""}
          <TextFieldContent
            id="title-textfield"
            fullWidth
            label="Title"
            inputProps={{ maxLength: 30 }}
            helperText="Maximum of signs: 30"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextFieldContent
            id="shortDes-textfield"
            fullWidth
            label="Short description"
            inputProps={{ maxLength: 70 }}
            helperText="Maximum of signs: 70"
            onChange={(e) => {
              setDescriptionShort(e.target.value);
            }}
          />
          <TextFieldContent
            id="longDes-textfield"
            fullWidth
            label="Long description"
            inputProps={{ maxLength: 200 }}
            helperText="Maximum of signs: 200"
            onChange={(e) => {
              setDescriptionLong(e.target.value);
            }}
          />
          <Search>
            <AutocompleteContent
              disablePortal
              id="combo-box-demo"
              options={subjectsProps}
              onChange={(event, newValue) => {
                setSubject(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Subject"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                />
              )}
            />
            <AutocompleteContent
              disablePortal
              id="combo-box-demo1"
              options={rangesProps}
              onChange={(event, newValue) => {
                setRange(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Range"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                />
              )}
            />
            <AutocompleteContent
              disablePortal
              id="combo-box-demo2"
              options={locationsProps}
              onChange={(event, newValue) => {
                setLocation(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Location"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                />
              )}
            />
          </Search>

          <TextField
            id="price-textfield"
            label="Price"
            type="number"
            sx={{ marginTop: 3 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <TextField
            id="imageUrl-textfield"
            fullWidth
            label="Image URL"
            sx={{ marginTop: 3 }}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />

          <ButtonContent type="submit" variant="contained" onClick={addOffer}>
            Add offer
          </ButtonContent>
        </FormWrapper>
        <ModalContent />
      </PaperContent>
    </Container>
  );
};

export default AddCourse;
