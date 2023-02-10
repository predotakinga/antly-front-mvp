import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import axios from "axios";
import { useEffect } from "react";
import {
  WrapperNoMargin,
  WrapperPlaces,
  WrapperProps,
  WrapperTitle,
} from "./RightbarElements";

const Rightbar = () => {
  const [firstPlace, setFirtPlace] = useState("");
  const [secondPlace, setSecondPlace] = useState("");
  const [thirdPlace, setThirdPlace] = useState("");
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const [range, setRange] = useState("");
  const [price, setPrice] = useState(0);

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
          let arr = [];
          let arrCount = [];

          res.data.forEach((item) => {
            arrCount.push(`"teacherName": ${item.teacherName}`);
          });
          res.data.forEach((item) => {
            if (!arrCount[item.teacherName]) {
              arrCount[item.teacherName] = 1;
            } else {
              arrCount[item.teacherName] += 1;
            }
          });

          res.data.forEach((item) => {
            arr.push({
              teacherName: item.teacherName,
              count: arrCount[item.teacherName],
            });
          });

          const unique = arr.filter(
            (item, index, array) =>
              array.findIndex(
                (itemDuplicate) =>
                  itemDuplicate.teacherName === item.teacherName
              ) === index
          );
          unique.sort((a, b) => b.count - a.count);
          setFirtPlace(unique[0].teacherName);
          setSecondPlace(unique[1].teacherName);
          setThirdPlace(unique[2].teacherName);

          let subjectArr = [];
          let subjectCount = [];

          res.data.forEach((item) => {
            subjectCount.push(`"subject": ${item.subject}`);
          });

          res.data.forEach((item) => {
            if (!subjectCount[item.subject]) {
              subjectCount[item.subject] = 1;
            } else {
              subjectCount[item.subject] += 1;
            }
          });

          res.data.forEach((item) => {
            subjectArr.push({
              subject: item.subject,
              count: subjectCount[item.subject],
            });
          });

          const subjectObj = subjectArr.filter(
            (item, index, array) =>
              array.findIndex(
                (itemDuplicate) => itemDuplicate.subject === item.subject
              ) === index
          );

          let maxCountSubject = Math.max(...subjectObj.map((e) => e.count));
          let objSubject = subjectObj.find(
            (item) => item.count === maxCountSubject
          );

          setSubject(objSubject.subject);

          let locationArr = [];
          let locationCount = [];

          res.data.forEach((item) => {
            locationCount.push(`"location": ${item.location}`);
          });

          res.data.forEach((item) => {
            if (!locationCount[item.location]) {
              locationCount[item.location] = 1;
            } else {
              locationCount[item.location] += 1;
            }
          });

          res.data.forEach((item) => {
            locationArr.push({
              location: item.location,
              count: locationCount[item.location],
            });
          });

          const locationObj = locationArr.filter(
            (item, index, array) =>
              array.findIndex(
                (itemDuplicate) => itemDuplicate.location === item.location
              ) === index
          );

          let maxCountLocation = Math.max(...locationObj.map((e) => e.count));
          let objLocation = locationObj.find(
            (item) => item.count === maxCountLocation
          );
          console.log(locationArr);
          setLocation(objLocation.location);

          let rangeArr = [];
          let rangeCount = [];

          res.data.forEach((item) => {
            rangeCount.push(`"range": ${item.range}`);
          });

          res.data.forEach((item) => {
            if (!rangeCount[item.range]) {
              rangeCount[item.range] = 1;
            } else {
              rangeCount[item.range] += 1;
            }
          });

          res.data.forEach((item) => {
            rangeArr.push({
              range: item.range,
              count: rangeCount[item.range],
            });
          });

          const rangeObj = rangeArr.filter(
            (item, index, array) =>
              array.findIndex(
                (itemDuplicate) => itemDuplicate.range === item.range
              ) === index
          );

          let maxCountRange = Math.max(...rangeObj.map((e) => e.count));
          let objRange = rangeObj.find((item) => item.count === maxCountRange);

          setRange(objRange.range);

          let priceArr = [];
          res.data.map((e) => priceArr.push(e.price));
          const average = priceArr.reduce((a, b) => a + b, 0) / priceArr.length;
          setPrice(average.toFixed(2));
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
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <WrapperNoMargin>
        <Typography variant="overline">Ranking of teachers</Typography>
      </WrapperNoMargin>
      <WrapperPlaces>
        <EmojiEventsIcon fontSize="large" style={{ color: "gold" }} />
        <Typography variant="overline">{firstPlace}</Typography>
      </WrapperPlaces>
      <WrapperNoMargin>
        <EmojiEventsIcon fontSize="large" style={{ color: "silver" }} />
        <Typography variant="overline">{secondPlace}</Typography>
      </WrapperNoMargin>
      <WrapperNoMargin>
        <EmojiEventsIcon fontSize="large" style={{ color: "#8b4513" }} />
        <Typography variant="overline">
          {thirdPlace ? thirdPlace : "No third place"}
        </Typography>
      </WrapperNoMargin>
      <WrapperTitle>
        <Typography variant="overline">Most bids for an subject</Typography>
      </WrapperTitle>
      <WrapperProps>
        <Typography variant="overline">{subject}</Typography>
      </WrapperProps>
      <WrapperTitle>
        <Typography variant="overline"> Most offers for a location</Typography>
      </WrapperTitle>
      <WrapperProps>
        <Typography variant="overline">{location}</Typography>
      </WrapperProps>
      <WrapperTitle>
        <Typography variant="overline"> Average course price</Typography>
      </WrapperTitle>
      <WrapperProps>
        <Typography variant="overline">{price} $</Typography>
      </WrapperProps>
      <WrapperTitle>
        <Typography variant="overline"> Most bids for a range</Typography>
      </WrapperTitle>
      <WrapperProps>
        <Typography variant="overline">{range}</Typography>
      </WrapperProps>
    </Box>
  );
};

export default Rightbar;
