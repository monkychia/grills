import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Detail from "./pages/Detail";
import Supply from "./pages/Supply";
import NoMatch from "./pages/NoMatch";
import RentConf from "./pages/RentConfirmation";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rent" component={Rent} />
        <Route exact path="/supplier" component={Supply} />
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/rentconf" component={RentConf} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
