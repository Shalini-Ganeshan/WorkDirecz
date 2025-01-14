import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../ReduxToolkit/AuthSlice";

const LoginForm = ({ togglePanel }) => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let errorText = "";
    if (name === "email") {
      errorText =
        value === ""
          ? "Email is required"
          : !/\S+@\S+\.\S+/.test(value)
          ? "Please enter a valid email address"
          : "";
    } else if (name === "password") {
      errorText = value === "" ? "Password is required" : "";
    }

    setErrors({ ...errors, [name]: errorText });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    setSubmitted(true); 
   
    if (!errors.email && !errors.password) {
    
      dispatch(login(formData));
      console.log("Login Form Submitted ", formData);
    } else {
      console.log("Validation errors present, not submitting");
    }
  };
  const isFormValid = formData.email !== "" && formData.password !== "" && !errors.email && !errors.password;

  return (
    <div className="">
      <h1 className="text-lg font-bold text-center pb-8 textStyle">Login</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          placeholder="Enter your email"
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          placeholder="Enter your password"
        />

      
        {submitted && error && !loading && (
          <div style={{ color: "red", textAlign: "center" }}>{error}</div>
        )}

        <div>
          <Button
            sx={{ padding: ".7rem 0rem" }}
            className="customeButton"
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={loading || !isFormValid} 
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>

      <div className="textStyle mt-5 flex items-center gap-2 py-5 justify-center">
        <span>Don't have an account?</span>
        <Button className="" onClick={togglePanel} color="primary">
          signup
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
