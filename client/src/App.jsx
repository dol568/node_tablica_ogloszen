import "./App.css";
import AppWrapper from "./components/AppWrapper/AppWrapper";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Content from "./components/Content/Content";

function App() {
  return (
    <AppWrapper>
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </AppWrapper>
  );
}

export default App;
