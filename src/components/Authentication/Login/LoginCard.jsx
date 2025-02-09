import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, IconButton, InputAdornment } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginCard() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const togglePasswordVisibility = () => setPasswordShown((prev) => !prev);

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(import.meta.env.VITE_API_BASE_URL + 'signin/', { username, password });
        if (response.status === 200) {
          console.log(response.data);
          const token = response.data.access;
          Cookies.set('token', token, { expires: 7 }); // Token will expire in 7 days
          console.log('Token stored in cookies:', token);
        }
      } catch (error) {
        if (error.response) {
          const newErrors = { username: "", password: "" };
          if (error.response.status === 401) {
            newErrors.username = "Invalid username or password.";
          } else {
            newErrors.username = "An error occurred. Please try again.";
            newErrors.password = "An error occurred. Please try again.";
          }
          setErrors(newErrors);
        } else {
          console.error('Error logging in:', error);
        }
      }
    }
  };

  return (
    <Card className="flex justify-center items-center h-screen">
      <CardContent className="flex flex-col">
        <div className="my-5">
          <h4 className="text-4xl flex w-full justify-center">Login</h4>
          <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
            Enter your username and password to Log In
          </Typography>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={Boolean(errors.username)}
            helperText={errors.username}
            color="black"
          />
          <TextField
            label="Password"
            type={passwordShown ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color="black"
            error={Boolean(errors.password)}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {passwordShown ? <Eye size={20} /> : <EyeOff size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <button
            className="w-full bg-black transition-all duration-300 hover:bg-green-900 text-white shadow py-3 border border-black"
          >
            Log in
          </button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Not registered? <Link to="/signup">Create account</Link>
          </Typography>
        </form>
      </CardContent>
    </Card>
  );
}
