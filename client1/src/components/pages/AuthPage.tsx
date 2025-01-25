import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ForgotPasswordForm from "../Auth/ForgotPasswordForm";

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="whitesmoke"
      px={3}
    >
      <Tabs value={activeTab} onChange={handleChange} centered>
        <Tab label="Login" />
        <Tab label="Register" />
        <Tab label="Forgot Password" />
      </Tabs>
      <Box mt={3} width="100%" maxWidth={400}>
        {activeTab === 0 && <LoginForm />}
        {activeTab === 1 && <RegisterForm />}
        {activeTab === 2 && <ForgotPasswordForm />}
      </Box>
    </Box>
  );
};

export default AuthPage;
