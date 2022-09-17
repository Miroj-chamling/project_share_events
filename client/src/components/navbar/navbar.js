import { useEffect, useState } from "react";
import { AppBar, Typography, Toolbar, Button, Avatar } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../constants/reducersActionTypes";
import decode from "jwt-decode";

const MuiNavbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  //console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: ActionTypes.LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      position="static"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4" align="left" marginLeft={2}>
        Share Events
      </Typography>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: 12,
          width: "400px",
        }}
      >
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <Avatar alt={user.response.name} src={user.response.imageUrl}>
              {user.response.name.charAt(0)}
            </Avatar>
            <Typography variant="h6">{user.response.name}</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            style={{ marginRight: 20 }}
            variant="contained"
            component={Link}
            to="/auth"
            color="secondary"
          >
            Signin
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MuiNavbar;
