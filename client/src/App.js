import MuiNavbar from "./components/navbar/navbar";
import "./App.css";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <BrowserRouter>
      <MuiNavbar />
      <Container maxWidth="lg" style={{ marginTop: "26px" }}></Container>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/auth" exact element={<Auth />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
