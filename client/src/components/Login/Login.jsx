import "./Login.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { Box, Button, ButtonGroup, TextField, Card, CardContent, Typography, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleLogIn, ...stateAuth } = useAuthContext();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data) {
      handleLogIn(data);
    }
  };

  useEffect(() => {
    if (stateAuth.authenticated) {
      navigate("/");
    }
  }, [stateAuth.authenticated]);

  return (
    <Box className="wrapper-login">
      <Card elevation={0} sx={{ marginBottom: 2, borderRadius: 2, border: "solid 0.2px #c1c2c8" }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              Login
            </Typography>
            <HomeIcon sx={{ fontSize: 40, cursor: "pointer" }} onClick={() => navigate("/")} />
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
              type="email"
              label="Email"
              color="info"
              fullWidth
              className="form-control"
              {...register("username", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
              sx={{ mb: 3 }}
              helperText={
                errors.email && errors.email.type === "required" ? (
                  <small className="errorMsg">Email is required.</small>
                ) : errors.email && errors.email.type === "pattern" ? (
                  <small className="errorMsg">Email is not valid.</small>
                ) : (
                  ""
                )
              }
            />

            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
              type="password"
              color="info"
              fullWidth
              label="Password"
              className="form-control"
              {...register("password", {
                required: true,
              })}
              helperText={
                errors.password && errors.password.type === "required" ? (
                  <small className="errorMsg">Password is required.</small>
                ) : (
                  ""
                )
              }
              sx={{ mb: 3 }}
            />

            <ButtonGroup variant="contained" className="float-end mb-3">
              <Button type="submit">Login</Button>
            </ButtonGroup>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
