import "./Content.css";
import Box from '@mui/material/Box';

const Content = ({ children }) => {
  return <Box className={"content"}>{children}</Box>;
};

export default Content;