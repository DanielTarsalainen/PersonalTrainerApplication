import React from 'react';
import './App.css';
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Customerlist from "./components/Customerlist";
import Traininglist from "./components/Traininglist";
import Calendar from "./components/TrainCalendar";

import Home from "./Home";
import TrainCalendar from './components/TrainCalendar';


function App() {

  // used react router to generate navigation system
  
  const routes = ["/home", "/components/customerlist", "/components/traininglist", "/components/traincalendar"];


  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/">
          <AppBar style={{ background: '#FB7256', height: '75px' }}>
            <Tabs>
              <Tab label="Home" value={routes[0]} component={Link} to={routes[0]} />
              <Tab label="Customer" value={routes[1]} component={Link} to={routes[1]} />
              <Tab label="Training" value={routes[2]} component={Link} to={routes[2]} />
              <Tab label="Calendar" value={routes[3]} component={Link} to={routes[3]} />
            </Tabs>
          </AppBar>
        </Route>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/components/customerlist" component={Customerlist} />
          <Route path="/components/traininglist" component={Traininglist} />
          <Route path="/components/traincalendar" component={TrainCalendar} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
