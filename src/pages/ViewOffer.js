import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  createTheme,
  Modal,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Rightbar from "../components/Rightbar/Rightbar";
import Sidebar from "../components/SideBar/Sidebar";
import axios from "axios";
import ErrorIcon from "@mui/icons-material/Error";
import {
  AccountCircleOutlined,
  CheckCircle,
  ExpandCircleDown,
} from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import { theme } from "../theme";

const ViewOffer = () => {
  const [mode, setMode] = useState("light");
  const [courseProps, setCourseProps] = useState([]);
  const [userProps, setUserProps] = useState([]);
  const [showUserData, setShowUserData] = useState(false);
  const [validationErrorModal, setValidationErrorModal] = useState(false);
  const [validationPassedModal, setValidationPassedModal] = useState(false);

  const handleErrorModalClose = () => setValidationErrorModal(false);
  const handlePassedModalClose = () => setValidationPassedModal(false);
  const handleShowData = () => setShowUserData((wasOpened) => !wasOpened);

  const id = window.location.href.split("/").at(-1);

  const getCoursesData = async () => {
    let token = localStorage.getItem("token");
    try {
      await axios
        .get(`https://antly-backend.herokuapp.com/offers/${id}`, {
          headers: {
            Authorization: `Bearer ${token.replaceAll('"', "")}`,
          },
        })
        .then((res) => {
          setCourseProps(res.data);
          getTeacherData(res.data.teacherName);
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };

  const signToCourse = (teacherName, courseId) => {
    const token = localStorage.getItem("token");
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const userName = JSON.parse(rawPayload);

    if (userName.username == teacherName) {
      setValidationErrorModal(true);
    } else {
      try {
        axios
          .post(
            `https://antly-backend.herokuapp.com/favourites/`,
            {
              offerId: courseId,
            },
            {
              headers: {
                Authorization: `Bearer ${token.replaceAll('"', "")}`,
              },
            }
          )
          .then((res) => {
            setValidationPassedModal(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getTeacherData = async (teacherName) => {
    try {
      await axios
        .get(`https://antly-backend.herokuapp.com/auth/${teacherName}`, {})
        .then((res) => {
          setUserProps(res.data);
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCoursesData();
  }, []);

  return (
    <ThemeProvider theme={theme(mode)}>
      <Box bgcolor="background.default" color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />
          <Box
            flex={4}
            p={{ xs: 0, md: 2 }}
            sx={{
              height: "100%",
              overflow: "hidden",
              flexWrap: "wrap",
              display: "flex",
            }}
          >
            <Paper
              sx={{
                textAlign: "center",
                alignContent: "center",
                padding: 5,
                height: "100%",
                width: "90%",
                margin: "10px auto",
                boxShadow: 8,
              }}
            >
              <Typography
                variant="h8"
                color="#AB464F"
                component="h1"
                sx={{ marginBottom: "40px", textShadow: "1px black" }}
              >
                {courseProps.title}
              </Typography>
              {/* <Box sx={{ width: 100, height: 50, objectFit: "fill" }}> */}
              <img
                style={{
                  width: 600,
                  height: 250,
                  objectFit: "cover",
                  borderRadius: "25px",
                }}
                src={courseProps.imageUrl}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    "https://jaw.pl/wp-content/uploads/2020/10/korepetycje-jezyk-polski-1068x712.jpg";
                }}
              />
              {/* </Box> */}
              <br />
              <div
                style={{
                  display: "inline-flex",
                  spacing: 8,
                  marginTop: "10px",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#438482",
                    padding: 1,
                    borderRadius: "25px",
                    marginRight: "10px",
                  }}
                >
                  <Typography sx={{ color: "white" }}>
                    {courseProps.subject}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#438482",
                    padding: 1,
                    borderRadius: "25px",
                    marginRight: "10px",
                  }}
                >
                  <Typography sx={{ color: "white" }}>
                    {courseProps.range}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#438482",
                    padding: 1,
                    borderRadius: "25px",
                  }}
                >
                  <Typography sx={{ color: "white" }}>
                    {courseProps.location}
                  </Typography>
                </Box>
              </div>
              {/* <Typography>{courseProps.descriptionShort}</Typography> */}
              <Box sx={{ margin: "30px 110px" }}>
                {/* <Paper sx={{ boxShadow: 8, padding: 3, marginBottom: 3 }}> */}

                <Typography
                  color="#AB464F"
                  variant="h6"
                  sx={{ marginBottom: "2px" }}
                >
                  Description
                </Typography>
                <Typography>{courseProps.descriptionLong}</Typography>
                {/* </Paper> */}
              </Box>

              <div
                style={{
                  display: "inline-flex",
                  spacing: 8,
                  marginTop: "10px",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#AB464F",
                    padding: 1,
                    borderRadius: "25px",
                    marginRight: "10px",
                  }}
                >
                  <Typography sx={{ color: "white" }}>
                    Your teacher: {courseProps.teacherName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "#AB464F",
                    padding: 1,
                    borderRadius: "25px",
                    marginRight: "10px",
                  }}
                >
                  <Typography sx={{ color: "white" }}>
                    {courseProps.price} $ per hour
                  </Typography>
                </Box>
              </div>

              <Typography></Typography>
              <Button
                style={btnStyle}
                type="submit"
                onClick={(e) =>
                  signToCourse(courseProps.teacherName, courseProps.id, e)
                }
              >
                Add to favourite <StarIcon />
              </Button>
              <Button
                sx={{
                  alignItems: "center",
                  display: "flex",
                  color: "#C4824C",
                }}
                onClick={handleShowData}
              >
                {showUserData ? "Hide sensitive data" : "Show sensitive data"}
              </Button>
              {showUserData ? (
                <Box
                  sx={{
                    marginBottom: "3vh",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <AccountCircleIcon
                      sx={{ color: "#C4824C", marginRight: "1vh" }}
                    />{" "}
                    {userProps.name} {userProps.surname}
                  </Typography>
                  <Typography
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <EmailIcon sx={{ color: "#C4824C", marginRight: "1vh" }} />{" "}
                    {userProps.email}
                  </Typography>
                  <Typography
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <LocalPhoneIcon
                      sx={{ color: "#C4824C", marginRight: "1vh" }}
                    />{" "}
                    {userProps.telephone}
                  </Typography>
                </Box>
              ) : (
                " "
              )}
            </Paper>
          </Box>
          <Rightbar />
        </Stack>
        <Modal
          open={validationErrorModal}
          onClose={handleErrorModalClose}
          sx={{}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper
            sx={{
              padding: 5,
              height: "40vh",
              width: "35vh",
              margin: "10px auto",
              boxShadow: 14,
            }}
          >
            <Avatar sx={{ backgroundColor: "red", marginBottom: "5%" }}>
              <ErrorIcon />
            </Avatar>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              You can not sign to your course!
            </Typography>
            <Button onClick={handleErrorModalClose}>Go back</Button>
          </Paper>
        </Modal>
        <Modal
          open={validationPassedModal}
          onClose={handlePassedModalClose}
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
            <Avatar sx={{ backgroundColor: "green", marginBottom: "5%" }}>
              <CheckCircle />
            </Avatar>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              You are now signed into that course
            </Typography>
            <Button onClick={handlePassedModalClose}>Go back</Button>
          </Paper>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

const btnStyle = {
  color: "#C4824C",
  marginTop: "3vh",
};

const linkStyle = {
  color: "#AB464F",
  textDecoration: "none",
};

export default ViewOffer;
