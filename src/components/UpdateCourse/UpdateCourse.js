import { Paper, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
} from "./UpdateCourseElements";

const UpdateCourse = () => {
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

  const getOfferProps = () => {
    const id = window.location.href.split("/").at(-1);
    let token = localStorage.getItem("token");
    try {
      axios
        .get(`https://antly-backend.herokuapp.com/offers/${id}`, {
          headers: {
            Authorization: `Bearer ${token.replaceAll('"', "")}`,
          },
        })
        .then((res) => {
          setTitle(res.data.title);
          setDescriptionShort(res.data.descriptionShort);
          setDescriptionLong(res.data.descriptionLong);
          setSubject(res.data.subject);
          setRange(res.data.range);
          setLocation(res.data.location);
          setPrice(res.data.price);
          setImageUrl(res.data.imageUrl);
        })
        .catch((err) => {
          //...
        });
    } catch (err) {
      console.log(err);
    }
  };

  const updateOffer = () => {
    const id = window.location.href.split("/").at(-1);
    let token = localStorage.getItem("token");
    try {
      axios
        .patch(
          `https://antly-backend.herokuapp.com/offers/${id}`,
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
      <Modal
        open={modalState}
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
            Your offer has been updated successfully!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <LinkContent to="/">
              Click here to come back to home page
            </LinkContent>
          </Typography>
        </Paper>
      </Modal>
    );
  };

  useEffect(() => {
    getOfferProps();
  }, []);

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
              UPDATE OFFER
            </Title>
          </TitleWrapper>

          {error !== "" ? error.map((item) => <Error>{item}</Error>) : ""}

          <TextFieldContent
            id="title-textfield"
            fullWidth
            label="Title"
            placeholder={title}
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
            placeholder={descriptionShort}
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
            placeholder={descriptionLong}
            inputProps={{ maxLength: 200 }}
            helperText="Maximum of signs: 200"
            onChange={(e) => {
              setDescriptionLong(e.target.value);
            }}
          />

          <Search>
            <AutocompleteContent
              disablePortal
              id="combo-box-demo1"
              disabled
              renderInput={(params) => (
                <TextField {...params} label={subject} />
              )}
            />
            <AutocompleteContent
              disablePortal
              id="combo-box-demo1"
              disabled
              renderInput={(params) => <TextField {...params} label={range} />}
            />
            <AutocompleteContent
              disablePortal
              id="combo-box-demo2"
              disabled
              renderInput={(params) => (
                <TextField {...params} label={location} />
              )}
            />
          </Search>

          <TextField
            id="price-textfield"
            label="Price"
            type="number"
            placeholder={price}
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
            placeholder={imageUrl}
            sx={{ marginTop: 3 }}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />

          <ButtonContent
            type="submit"
            variant="contained"
            onClick={updateOffer}
          >
            Update offer
          </ButtonContent>
        </FormWrapper>
        <ModalContent />
      </PaperContent>
    </Container>
  );
};

export default UpdateCourse;
