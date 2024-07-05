import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import ChatPage from "./Pages/ChatPage";
import ListPage from "./Pages/ListPage";
import ProfilePage from "./Pages/ProfilePage";
import Layout from "./Pages/Layout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LoginPage />}></Route>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<ListPage />}></Route>
            <Route path="chat" element={<ChatPage />}></Route>
            <Route path="profile" element={<ProfilePage />}></Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
