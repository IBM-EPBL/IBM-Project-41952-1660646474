import { useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppProvider } from "./context/AppContext";
import Auth from "./screens/Auth";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";

function App() {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: import.meta.env.VITE_WATSON_INTEGRATION_ID, // The ID of this integration.
      region: import.meta.env.VITE_WATSON_REGION, // The region your integration is hosted in.
      serviceInstanceID: import.meta.env.VITE_WATSON_SERVICE_INSTANCE_ID, // The ID of your service instance.
      onLoad: function (instance) {
        instance.render();
      },
    };
    setTimeout(function () {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    });
  }, []);
  return (
    <HashRouter>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AppProvider>
    </HashRouter>
  );
}

export default App;