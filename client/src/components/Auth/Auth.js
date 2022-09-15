import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../constants/reducersActionTypes";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const clientId =
  "296660586296-f1gsaetnf70j1n4p8d6f118sol7mhrrt.apps.googleusercontent.com";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((state) => !state);

  const switchMode = () => {
    setIsSignUp((signupState) => !signupState);
  };

  const googleSuccessHandler = async (res) => {
    const response = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: ActionTypes.AUTH, payload: { response, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailureHandler = (error) => {
    console.log(error);
    console.log("Unsccessful google signin");
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        style={{
          paddingTop: 16,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar>
          <LockIcon />
        </Avatar>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="firstName"
                  handleChange={handleChange}
                  autoFocus
                  half
                ></Input>
                <Input
                  name="lastName"
                  label="lastName"
                  handleChange={handleChange}
                  half
                ></Input>
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            ></Input>
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"} //show password false
              handleShowPassword={handleShowPassword}
            ></Input>
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="confirmPassword"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: "16px 0px 16px 0px" }}
          >
            {isSignUp ? "Sign Up" : "Sign in "}
          </Button>
          <Button fullWidth>
            <GoogleLogin
              clientId={clientId}
              // render={(renderProps) => (
              //   <Button
              //     fullWidth
              //     color="primary"
              //     onClick={renderProps.onClick}
              //     disabled={renderProps.disabled}
              //     variant="contained"
              //   >
              //     Google Sign In
              //   </Button>
              // )}
              onSuccess={googleSuccessHandler}
              onFailure={googleFailureHandler}
              cookiePolicy="single_host_origin"
            />
          </Button>
          <Typography
            variant="body2"
            style={{ textAlign: "center", marginTop: 16 }}
          >
            {isSignUp ? "Already have and account?" : "Don't Have an account?"}
          </Typography>
          <Button
            onClick={switchMode}
            variant="contained"
            fullWidth
            style={{ margin: "16px 0px 16px 0px" }}
          >
            {isSignUp ? "Sign in" : "SignUp"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
