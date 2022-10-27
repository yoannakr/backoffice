import React from "react";
import "./App.scss";
import { UsersList } from "./features/user/UsersList/UsersList";
import { UserPostsList } from "./features/post/UserPostsList/UserPostsList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TasksList } from "./features/tasks/TasksList";
import { UserProfile } from "./features/user/UserProfile/UserProfile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/userPosts/:userId" element={<UserPostsList />} />
          <Route path="/tasks" element={<TasksList />} />
          <Route path="/user/:userId" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
