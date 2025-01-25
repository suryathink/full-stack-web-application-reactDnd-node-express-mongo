import React from "react";
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";

const GoogleOAuthButton: React.FC = () => {
  const handleGoogleLogin = () => {
    window.location.href = "/auth/google"; // Replace with actual endpoint
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="outlined"
      startIcon={<Google />}
      fullWidth
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleOAuthButton;
