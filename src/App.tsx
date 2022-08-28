import React from "react";
import "./App.scss";
import { UsersList } from "./features/user/UsersList/UsersList";
import { UserPostsList } from "./features/post/UserPostsList/UserPostsList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/userPosts/:userId" element={<UserPostsList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
