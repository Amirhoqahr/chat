import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LoginPage />}></Route>
          <Route path="*" element={<h1>Page Not Found</h1>}></Route>
        </Routes>
      </BrowserRouter>
      <LoginPage />
    </div>
  );
}

export default App;
