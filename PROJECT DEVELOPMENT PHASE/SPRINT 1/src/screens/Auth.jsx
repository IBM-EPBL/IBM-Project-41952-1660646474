import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import { AppContext } from "../context/AppContext";

const Auth = () => {
  const navigate = useNavigate();

  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate("dashboard");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-5">
      <Tabs isFitted variant="line" colorScheme={"purple"}>
        <TabList mb="1em">
          <Tab>Login</Tab>
          <Tab>SignUp</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Auth;