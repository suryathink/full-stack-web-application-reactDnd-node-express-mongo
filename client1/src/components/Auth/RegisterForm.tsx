import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log(data); // Replace with API call
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        {...register("email", { required: "Email is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained" fullWidth>
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
