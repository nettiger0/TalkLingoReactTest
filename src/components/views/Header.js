import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";

function Header(props) {

  return (
    <div>
      <div>
        <h1>TalkLingo</h1>
      </div>
      <div>
        <Routes>
          <Route path="/" exact={true} Component={Login} />
        </Routes>
      </div>
      <hr />
    </div>
  );
}

export default Header;
