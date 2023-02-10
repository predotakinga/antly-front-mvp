import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  ButtonContent,
  CardProps,
  CardWrapper,
  Container,
  Subject,
} from "./FavouritesCoursesElements";

const FavouritesCourses = () => {
  const [offerProps, setOfferProps] = useState([]);

  const getOffers = async () => {
    const token = localStorage.getItem("token");
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const userName = JSON.parse(rawPayload);
    try {
      await axios
        .get(
          `https://antly-backend.herokuapp.com/favourites/${userName.username}`,
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
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const userName = JSON.parse(rawPayload);
    try {
      axios
        .delete(
          `https://antly-backend.herokuapp.com/favourites/${userName.username}/${offerId}`,
          {
            headers: {
              Authorization: `Bearer ${token.replaceAll('"', "")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
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
                <ButtonContent
                  onClick={(e) => deleteOffer(offer.favouritesId, e)}
                >
                  Delete from favourites
                </ButtonContent>
              </CardActions>
            </CardWrapper>
          </Stack>
        );
      })}
    </Container>
  );
};

export default FavouritesCourses;
