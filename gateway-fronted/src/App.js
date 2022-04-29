import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Gateway from "./components/Gateway/Gateway";
import Peripheral from "./components/Peripherical/Peripherical";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import NavBar from "./components/NavBar/NavBar";
import Gatewayform from "./components/Gatewayform/Gatewayform";
import Periphericalform from "./components/Periphericalform/Periphericalform";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className="wrapper">
          <Sidebar />
          <div id="content" style={{ width: "100vw" }}>
            <NavBar />
            <Routes>
              <Route path="" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/gateway" element={<Gateway />} />
              <Route path="/gateway/form" element={<Gatewayform />} >
                <Route path=":id" element={<Gatewayform />}/>
              </Route>
              <Route path="/peripheral" element={<Peripheral />} />
              <Route path="/peripheral/form" element={<Periphericalform />} >
              <Route path=":id" element={<Periphericalform />}/>
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
