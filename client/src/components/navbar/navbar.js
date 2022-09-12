import { AppBar, Typography, Toolbar } from "@mui/material";

const MuiNavbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" align="center" marginLeft={2}>
          Share Events
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MuiNavbar;
