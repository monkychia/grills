import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Detail from "./pages/Detail";
import Supply from "./pages/Supply";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RentConf from "./pages/RentConfirmation";
import Nav from "./components/Nav";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
    this.userBecameAuthenticated = this.userBecameAuthenticated.bind(this);
  }

  userBecameAuthenticated(authenticated){
    this.setState({authenticated});
  }

  render() {
    const { authenticated } = this.state;
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={
                authenticated ? Home :  () => <Login userBecameAuthenticated={this.userBecameAuthenticated} />
              }
            />
            <Route exact path="/rent" component={authenticated ? Rent : () => <Login userBecameAuthenticated={this.userBecameAuthenticated} />} />
            <Route exact path="/supplier" component={authenticated ? Supply : () => <Login userBecameAuthenticated={this.userBecameAuthenticated} />} />
            <Route exact path="/detail/:id" component={authenticated ? Detail : () => <Login userBecameAuthenticated={this.userBecameAuthenticated} />} />
            <Route exact path="/rentconf" component={authenticated ? RentConf : () => <Login userBecameAuthenticated={this.userBecameAuthenticated} />} />
            {/* <Route exact path="/login" component={() => "/" />} /> */}
            <Route exact path="/signup" component={authenticated ? Home : Signup} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;
