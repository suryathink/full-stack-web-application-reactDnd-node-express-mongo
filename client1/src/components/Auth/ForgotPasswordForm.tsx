import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";

interface ForgotPasswordFormInputs {
  email: string;
}

const ForgotPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>();

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = (data) => {
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
        label="Email"
        variant="outlined"
        fullWidth
        {...register("email", { required: "Email is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button type="submit" variant="contained" fullWidth>
        Reset Password
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
