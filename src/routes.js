import React from "react";
import { Route, Switch} from "react-router-dom";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import PasswordReset from "./components/auth/passwordReset";
import ResetPassword from "./components/auth/resetPassword";
import RegisterAdmin from "./components/admin/registerAdmin";
import AdminDashBoard from "./components/admin/adminDashboard";
import UserProfile from "./components/auth/profile";
import ProtectedRoute from "./protectedRoutes";
import NotFound from "./components/common/404page";
import Employees from "./components/employees/listEmployees";
import AddNewEmployee from "./components/employees/addEmployee";
import Employee from "./components/employees/employeeProfile";
import EditEmployee from "./components/employees/editEmployee";
import AddNewCourse from "./components/course/addCourse";
import Course from "./components/course/courseProfile";
import EditCourse from "./components/course/editCourse";
import Courses from "./components/course/listCourse";
import AddNewGrade from "./components/grade/addGrade";
import EditGrade from "./components/grade/editGrade";
import Grade from "./components/grade/gradeProfile";
import Grades from "./components/grade/listGrades";
import Titles from "./components/title/listTitles";
import AddNewTitle from "./components/title/addTitle";
import Title from "./components/title/titleProfile";
import EditTitle from "./components/title/editTitles";
import Departments from "./components/departments/listDepartments";
import AddNewDepartment from "./components/departments/addDepartment";
import Department from "./components/departments/departmentProfile";
import EditDepartment from "./components/departments/editDepartment";
import Employers from "./components/employer/listEmployers";
import AddNewEmployer from "./components/employer/addEmployer";
import { EmployerContext } from "./context/employer";
import Employer from "./components/employer/employerProfile";
import EditEmployer from "./components/employer/editEmployer";
import HomeOverview from "./components/home/home";

const BaseRouter = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/admin/register" component={RegisterAdmin} />
      <ProtectedRoute
        exact
        path="/admin/dashboard"
        component={AdminDashBoard}
      />
      <ProtectedRoute
        exact
        path="/staff/dashboard/users/profile/:userId"
        component={UserProfile}
      />
      <ProtectedRoute exact path="/performancemanager" component={HomeOverview} />
      <ProtectedRoute exact path="/performancemanager/employee-records" component={Employees} />
      <ProtectedRoute exact path="/performancemanager/add-employee" component={AddNewEmployee} />
      <ProtectedRoute exact path="/performancemanager/employee/:employeeId" component={Employee} />
      <ProtectedRoute exact path="/performancemanager/edit-employee/:employeeId" component={EditEmployee} />
      <ProtectedRoute exact path="/performancemanager/course-records" component={Courses} />
      <ProtectedRoute exact path="/performancemanager/add-course" component={AddNewCourse} />
      <ProtectedRoute exact path="/performancemanager/course/:courseId" component={Course} />
      <ProtectedRoute exact path="/performancemanager/edit-course/:courseId" component={EditCourse} />
      <ProtectedRoute exact path="/performancemanager/grade-records" component={Grades} />
      <ProtectedRoute exact path="/performancemanager/add-grade" component={AddNewGrade} />
      <ProtectedRoute exact path="/performancemanager/grade/:gradeId" component={Grade} />
      <ProtectedRoute exact path="/performancemanager/edit-grade/:gradeId" component={EditGrade} />
      <ProtectedRoute exact path="/performancemanager/title-records" component={Titles} />
      <ProtectedRoute exact path="/performancemanager/add-title" component={AddNewTitle} />
      <ProtectedRoute exact path="/performancemanager/title/:titleId" component={Title} />
      <ProtectedRoute exact path="/performancemanager/edit-title/:titleId" component={EditTitle} />
      <ProtectedRoute exact path="/performancemanager/department-records" component={Departments} />
      <ProtectedRoute exact path="/performancemanager/add-department" component={AddNewDepartment} />
      <ProtectedRoute exact path="/performancemanager/department/:departmentId" component={Department} />
      <ProtectedRoute exact path="/performancemanager/edit-department/:departmentId" component={EditDepartment}/>
      <ProtectedRoute exact path="/performancemanager/employer-records" component={Employers} />
      <ProtectedRoute exact path="/performancemanager/add-employer" component={AddNewEmployer} />
      <ProtectedRoute exact path="/performancemanager/employer/:employerId" component={Employer} />
      <ProtectedRoute exact path="/performancemanager/edit-employer/:employerId" component={EditEmployer}/>

      <Route exact path="/password-reset-request" component={PasswordReset} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      <Route path="*" component={NotFound} />
    </Switch>
  </div>
);

export default BaseRouter;
