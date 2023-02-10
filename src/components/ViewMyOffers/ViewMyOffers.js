import {
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle } from "@mui/icons-material";
import {
  ButtonContent,
  CardProps,
  CardWrapper,
  LinkContent,
  Container,
  Subject,
} from "./ViewMyOffersElements";

const ViewMyOffers = () => {
  const [offerProps, setOfferProps] = useState([]);
  const [modalState, setModalState] = useState(false);

  const getOffers = async () => {
    const token = localStorage.getItem("token");
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const userName = JSON.parse(rawPayload);
    try {
      await axios
        .get(
          `https://antly-backend.herokuapp.com/offers/teacher/${userName.username}`,
          {
            headers: {
              Authorization: `Bearer ${token.replaceAll('"', "")}`,
            },
          }
        )
        .then((res) => {
          setOfferProps(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOffer = (offerId) => {
    const token = localStorage.getItem("token");
    try {
      axios
        .delete(`https://antly-backend.herokuapp.com/offers/${offerId}`, {
          headers: {
            Authorization: `Bearer ${token.replaceAll('"', "")}`,
          },
        })
        .then((res) => {
          setModalState(true);
          console.log(modalState);
        })
        .catch((error) => {
          console.log(error);
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
            <Avatar sx={{ backgroundColor: "#7DDE92", marginBottom: "5%" }}>
              <CheckCircle />
            </Avatar>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Offer has been deleted successfully!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <LinkContent to="/">Go to home</LinkContent>{" "}
            </Typography>
          </Paper>
        </Modal>
      </>
    );
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <Container flex={4} p={{ xs: 0, md: 2 }}>
      {offerProps.map((offer, index) => {
        return (
          <Stack spacing={1}>
            <CardWrapper key={index}>
              <CardMedia
                component="img"
                height="140"
                image={offer.imageUrl}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    "https://jaw.pl/wp-content/uploads/2020/10/korepetycje-jezyk-polski-1068x712.jpg";
                }}
              />
              <CardContent>
                <Typography variant="body1" component="div">
                  <Subject>{offer.subject}</Subject>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  <Typography>{offer.title}</Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {offer.descriptionShort}
                </Typography>
                <CardProps>{offer.location}</CardProps>
                <CardProps>Price: {offer.price} $</CardProps>
                <CardProps>Range: {offer.range}</CardProps>
              </CardContent>
              <CardActions>
                <ButtonContent onClick={(e) => deleteOffer(offer.id, e)}>
                  Delete
                </ButtonContent>
                <ButtonContent>
                  <LinkContent to={"/updateoffer/" + offer.id}>
                    Update
                  </LinkContent>
                </ButtonContent>
              </CardActions>
            </CardWrapper>
          </Stack>
        );
      })}
      <ModalContent />
    </Container>
  );
};

export default ViewMyOffers;
