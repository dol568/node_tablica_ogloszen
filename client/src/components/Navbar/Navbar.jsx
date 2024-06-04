import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Grid } from "@mui/material";

const Navbar = () => {
  const { handleLogOut, ...stateAuth } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    handleLogOut();
  };

  return (
    
      <AppBar elevation={0} sx={{ bgcolor: "#fff", color:'#000',width: '100%',placeItems: 'center' }}>
        <Toolbar sx={{ width: '75%'}}>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <NavLink className="navbar-brand" to="/">
            <Typography variant="h6" component="div" sx={{ mr: 1 }}>
              Community Board
            </Typography>
          </NavLink>

          {stateAuth.authenticated && (
            <NavLink className="navbar-brand" to="create" style={{ textDecoration: "none" }}>
              <Fab variant="extended" color="secondary" size="medium" sx={{ ml: 2 }}>
                <AddIcon sx={{ mr: 1 }} />
                Create New Ad
              </Fab>
            </NavLink>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>

          {!stateAuth.authenticated && (
            <NavLink className="navbar-brand pl-5" to="/login" style={{ textDecoration: "none" }}>
              <Button color="inherit">Login</Button>
            </NavLink>
          )}

          {stateAuth.authenticated && (
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
              <Typography variant="h6" component="div" sx={{ mr: 1 }}>
                {`Welcome back, ${stateAuth.user && stateAuth.user.firstName}!`}
              </Typography>
              <IconButton size="large" onClick={handleMenu} color="inherit">
                <AccountCircle style={{fontSize: 40}}/>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    
  );
};

export default Navbar;
