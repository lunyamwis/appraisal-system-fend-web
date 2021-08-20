import React, { Component } from "react";
/*import { BrowserRouter as Router } from "react-router-dom";*/
import Layout from "./components/common/layout";
import { AuthProvider } from "./context/auth";
import Home from "./components/home/home";
import { Router } from "@reach/router";
import Employees from "./components/employees/employees";
import Detail from "./components/employees/details";
import Profile from "./components/employees/profile";
import Employer from "./components/employer/employer";
import Grade from "./components/grade/grade";
import Department from "./components/departments/department";
import Edit from "./components/employees/edit";
import Course from "./components/course/course";
import Title from "./components/title/title";
import Dummy from "./components/employees/dummy";

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {/*<AuthProvider>
          <Router>
            <Layout {...this.props} />
          </Router>
        </AuthProvider>*/}
        <Home />
        <Router>
          <Course path="/course" />
          <Dummy path="/dummy" />
          <Department path="/department" />
          <Edit path="/edit" />
          <Grade path="/grade" />
          <Employer path="/employer" />
          <Profile path="/profile" />
          <Employees path="/employees" />
          <Detail path="/details" />
          <Title path="/title" />
        </Router>
      </div>
    );
  }
}

export default App;
