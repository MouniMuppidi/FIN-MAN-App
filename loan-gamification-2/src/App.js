import React from "react";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LevelOne from "./pages/LevelOne";
import LevelTwo from "./pages/LevelTwo";
import LevelThree from "./pages/LevelThree";
import AllLevelsCompleted from "./pages/AllLevelsCompleted";

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <Suspense >
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/levelone"} element={<LevelOne />} />
          <Route path={"/leveltwo"} element={<LevelTwo />} />
          <Route path={"/levelthree"} element={<LevelThree />} />
          <Route path={"/alllevelscompleted"} element={<AllLevelsCompleted />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
