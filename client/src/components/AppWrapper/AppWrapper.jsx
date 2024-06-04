import Box from "@mui/material/Box";
import "./AppWrapper.css";

const AppWrapper = ({ children }) => {
  return <Box className={"wrapper"}>{children}</Box>;
};

export default AppWrapper;
