import { Switch, Route } from 'react-router-dom';
import React, { Component } from "react";
import NavigationBar from './containers/NavigationBar/NavigationBar';
import Home from './containers/Home/Home';
import Login from "./containers/Users/Login/Login";
import Signup from "./containers/Users/Signup/Signup";
import Edit from "./containers/Edit/Edit";
import View from "./containers/View/View";

class App extends Component {
    render () {
        return (
            <div>
                <NavigationBar />
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/myarticles" component={Home}/>
                    <Route path="/create" component={Edit} />
                    <Route path="/edit/:id" component={Edit}/>
                    <Route path="/view/:id" component={View} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default App;
