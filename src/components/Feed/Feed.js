import {
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AutoCompleteContent,
  AutoCompleteWrapper,
  ButtonContent,
  CardProps,
  CardWrapper,
  Container,
  LinkContent,
  Subject,
} from "./FeedElements";
import {
  locationsProps,
  rangesProps,
  subjectsProps,
} from "./autoCompleteProps";

const Feed = () => {
  const [offerProps, setOfferProps] = useState([]);
  const [subject, setSubject] = useState(null);
  const [range, setRange] = useState(null);
  const [location, setLocation] = useState(null);

  const getOffers = async () => {
    let token = localStorage.getItem("token");

    try {
      await axios
        .get(`https://antly-backend.herokuapp.com/offers`, {
          headers: {
            Authorization: `Bearer ${token.replaceAll('"', "")}`,
          },
        })
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

  const getOffersWithFilter = async () => {
    let token = localStorage.getItem("token");

    try {
      await axios
        .get(
          `https://antly-backend.herokuapp.com/offers?subject=${subject}&range=${range}&location=${location}`,
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

  useEffect(() => {
    if (subject !== null && range !== null && location !== null) {
      getOffersWithFilter();
    } else getOffers();
  }, [offerProps]);

  return (
    <Container flex={4} p={{ xs: 0, md: 2 }}>
      <AutoCompleteWrapper>
        <AutoCompleteContent
          disablePortal
          id="combo-box-demo"
          options={subjectsProps}
          value={subject}
          onChange={(event, newSubject) => {
            setSubject(newSubject);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Subject"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                size: "small",
              }}
            />
          )}
        />
        <AutoCompleteContent
          disablePortal
          id="combo-box-demo"
          options={rangesProps}
          value={range}
          onChange={(event, newRange) => {
            setRange(newRange);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Range"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                size: "small",
              }}
            />
          )}
        />
        <AutoCompleteContent
          disablePortal
          id="combo-box-demo"
          options={locationsProps}
          value={location}
          onChange={(event, newLocation) => {
            setLocation(newLocation);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Location"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                size: "small",
              }}
            />
          )}
        />
      </AutoCompleteWrapper>
      {offerProps.map((offer, index) => {
        return (
          <Stack spacing={1}>
            <CardWrapper key={index}>
              <CardMedia
                component="img"
                height="140"
                image={offer.imageUrl}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
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
                <ButtonContent>
                  <LinkContent to={"/viewoffer/" + offer.id}>
                    View offer
                  </LinkContent>
                </ButtonContent>
              </CardActions>
            </CardWrapper>
          </Stack>
        );
      })}
    </Container>
  );
};

export default Feed;
