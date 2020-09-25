import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import FlyerPage from "./containers/Flyer";
import BusinessCardPage from "./containers/BusinessCard";


const BaseRouter = () => (
    <Hoc>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={HomepageLayout} />
        <Route path="/flyer" component={FlyerPage} />
        <Route path="/businesscard" component={BusinessCardPage} />

    </Hoc>
);

export default BaseRouter;
