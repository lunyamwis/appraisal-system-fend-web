import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/common/layout";
import { AuthProvider } from "./context/auth";
import { EmployeePolicyProvider } from "./context/employee";
import { CourseProvider } from "./context/course";
import { GradeProvider } from "./context/grade";
import { TitleProvider } from "./context/title";
import { DepartmentProvider } from "./context/department";
import { EmployerProvider } from "./context/employer";

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <AuthProvider>
          <EmployeePolicyProvider>
            <CourseProvider>
              <GradeProvider>
                <TitleProvider>
                  <DepartmentProvider>
                    <EmployerProvider>
                      <Router>
                        <Layout {...this.props} />
                      </Router>
                    </EmployerProvider>
                  </DepartmentProvider>
                </TitleProvider>
              </GradeProvider>
            </CourseProvider>
          </EmployeePolicyProvider>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
