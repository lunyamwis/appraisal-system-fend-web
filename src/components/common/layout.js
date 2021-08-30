import React, { useState, useContext, useEffect } from "react";
import {
  Menu,
  Segment,
  Image,
  Dropdown,
  Sidebar,
  Button,
  Grid,
<<<<<<< HEAD
=======
  Icon
>>>>>>> f7a7bf703cc629f4ddbbc531149b990384349fdd
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import BaseRouter from "../../routes";

export default function Layout(props) {
  const [activeItem, setActiveItem] = useState({});
  const [isHome, setIsHome] = useState(false);
  const context = useContext(AuthContext);

  useEffect(() => {
    if (window.location.pathname === "/") setIsHome(true);
  }, []);
  const onClickHandler = () => {
    window.location.href = "/";
  };
  // console.log(props)
  const [visible, setVisible] = useState(false);
  const handleHideClick = () => setVisible(false);
  const handleShowClick = () => setVisible(true);
  const handleSidebarHide = () => setVisible(false);
  const handleItemClick = (e, { name }) => {
    setActiveItem({ activeItem: name });
    setVisible(false);
  };
  const trigger = (
    <span>
      {context.user ? (
        <div>
          <Image avatar src={context.user.imageUrl} /> {context.user.username}
        </div>
      ) : (
        ""
      )}
    </span>
  );

  const options = [
<<<<<<< HEAD
    { key: "user", text: "Account", icon: "user", value: "staff/profile" },
=======
    { key: "user", text: "Account", icon: "user", value: "/" },
>>>>>>> f7a7bf703cc629f4ddbbc531149b990384349fdd
    {
      key: "settings",
      text: "Settings",
      icon: "settings",
<<<<<<< HEAD
      value: "staff/settings",
=======
      value: "/",
>>>>>>> f7a7bf703cc629f4ddbbc531149b990384349fdd
    },
    { key: "sign-out", text: "Sign Out", icon: "sign out", value: "logout" },
  ];

  const handleDropdown = (event, data) => {
    switch (data.value) {
      case "logout":
        onClickHandler();
        context.logout();
        break;
      default:
        return data.value;
    }
  };
  return (
    <Segment>
      <Grid columns={1}>
        <Grid.Column>
          <Menu secondary>
            {context.user && !isHome && (
              <Menu.Item position="left">
                <Grid.Column>
                  <Button disabled={visible} onClick={handleShowClick}>
                    Menu
                  </Button>
                </Grid.Column>
              </Menu.Item>
            )}
            {context.user &&
              !isHome &&
              ((context.user.roles && context.user.roles.includes("admin")) ||
                (context.user.tokenAuth &&
                  context.user.tokenAuth.user.roles.includes("admin"))) && (
                <Menu.Item
                  name="dashboard"
                  active={activeItem === "dashboard"}
                  onClick={handleItemClick}
                  as={Link}
<<<<<<< HEAD
                  to="/admin/dashboard"
=======
                  to="/performancemanager/employee-records"
>>>>>>> f7a7bf703cc629f4ddbbc531149b990384349fdd
                />
              )}
            {context.user && !isHome && (
              <Menu.Item
                name="records"
                active={activeItem === "records"}
                onClick={handleItemClick}
                as={Link}
<<<<<<< HEAD
                to="/staff/dashboard/overview"
              />
            )}
            {context.user && !isHome && (
              <Menu.Item
                name="billing"
                active={activeItem === "billing"}
                onClick={handleItemClick}
=======
                to="/performancemanager"
>>>>>>> f7a7bf703cc629f4ddbbc531149b990384349fdd
              />
            )}
            {context.user && !isHome && (
              <Menu.Item
<<<<<<< HEAD
                name="receipts"
                active={activeItem === "receipts"}
                onClick={handleItemClick}
                as={Link}
                to="/staff/dashboard/receipt/view-receipts"
=======
                name="billing"
                active={activeItem === "billing"}
                onClick={handleItemClick}
>>>>>>> f7a7bf703cc629f4ddbbc531149b990384349fdd
              />
            )}
            {context.user && !isHome && (
              <Menu.Item
                name="reports"
                active={activeItem === "reports"}
                onClick={handleItemClick}
                position="left"
              />
            )}
            <Image src="" size="small" href="/" />
            {context.user && !isHome && (
              <Menu.Item position="right">
                <Dropdown
                  trigger={trigger}
                  options={options}
                  pointing="top right"
                  icon={null}
                  onChange={handleDropdown}
                />
              </Menu.Item>
            )}
          </Menu>
          <Sidebar.Pushable
            as={Segment}
            style={{ minHeight: "calc(100vh - 170px)" }}
          >
            <Sidebar
              as={Menu}
<<<<<<< HEAD
              style={{ background: "white" }}
=======
              style={{ background: "teal" }}
>>>>>>> f7a7bf703cc629f4ddbbc531149b990384349fdd
              animation="overlay"
              icon="labeled"
              inverted
              className="ui primary"
              onHide={handleSidebarHide}
              vertical
              visible={visible}
              width="thin"
            >
              <Menu.Item
                style={{ color: "black", textAlign: "left" }}
                as={Link}
<<<<<<< HEAD
                to="/"
                onClick={handleHideClick}
              >
                {/* <Icon name='home' /> */}
                Home
              </Menu.Item>
              <Menu.Item style={{ color: "black", textAlign: "left" }}>
                <Menu.Header>
                  {/* <Icon name='users' /> */}
                  <Link to="/staff/dashboard/client-records">Clients</Link>
                </Menu.Header>
                <Menu.Menu>
                  <Menu.Item
                    style={{ color: "black", textAlign: "left" }}
                    name="list-clients"
                    as={Link}
                    to="/staff/dashboard/client-records"
                    active={activeItem === "list-clients"}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    style={{ color: "black", textAlign: "left" }}
                    name="create-client"
                    as={Link}
                    to="/staff/dashboard/add-new-client"
                    active={activeItem === "create-client"}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    style={{ color: "black", textAlign: "left" }}
                    name="create-contact-person"
                    as={Link}
                    to="/staff/dashboard/add-new-contact-person"
                    active={activeItem === "create-contact-person"}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    style={{ color: "black", textAlign: "left" }}
                    name="list-contact-persons"
                    as={Link}
                    to="/staff/dashboard/contact-person-records"
                    active={activeItem === "list-contact-persons"}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    style={{ color: "black", textAlign: "left" }}
                    name="receipts"
                    as={Link}
                    to="/staff/dashboard/receipt/view-receipts"
                    active={activeItem === "view-receipts"}
                    onClick={handleItemClick}
                  />
                </Menu.Menu>
              </Menu.Item>
              <Menu.Item style={{ color: "black", textAlign: "left" }}>
                <Menu.Header>
                  {/* <Icon name='suitcase' /> */}
                  <Link to="/staff/dashboard/policies">Policies</Link>
                </Menu.Header>
                <Menu.Menu>
                  <Menu.Item
                    style={{ color: "black", textAlign: "left" }}
                    name="motor-policy"
                    as={Link}
                    to="/staff/dashboard/policies/general/motor"
                    active={activeItem === "motor-policy"}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    style={{ color: "black", textAlign: "left" }}
                    name="add-motor-policy"
                    as={Link}
                    to="/staff/dashboard/add-new-motor-policy"
                    active={activeItem === "add-motor-policy"}
                    onClick={handleItemClick}
                  />
                </Menu.Menu>
              </Menu.Item>
=======
                to="/performancemanager"
                onClick={handleHideClick}
              >
                <Icon name='home' />
              </Menu.Item>
              <Menu.Item
                style={{ color: "black"}}
                name="employees"
                as={Link}
                to="/performancemanager/employee-records"
                active={activeItem === "list-employees"}
                onClick={handleItemClick}
              >
                <Icon name='users'/>
                Employee
              </Menu.Item>
              
              <Menu.Item
                style={{ color: "black"}}
                name="employers"
                as={Link}
                to="/performancemanager/employer-records"
                active={activeItem === "list-employers"}
                onClick={handleItemClick}
              >
                <Icon name='user circle'/>
                Employer
              </Menu.Item>

              <Menu.Item
                style={{ color: "black"}}
                name="titles"
                as={Link}
                to="/performancemanager/title-records"
                active={activeItem === "list-titles"}
                onClick={handleItemClick}
              >
                <Icon name='id badge'/>
                Titles
              </Menu.Item>

              <Menu.Item
                style={{ color: "black"}}
                name="courses"
                as={Link}
                to="/performancemanager/course-records"
                active={activeItem === "list-courses"}
                onClick={handleItemClick}
              >
                <Icon name='certificate'/>
                Training
              </Menu.Item>
              <Menu.Item
                style={{ color: "black"}}
                name="grade"
                as={Link}
                to="/performancemanager/grade-records"
                active={activeItem === "list-grades"}
                onClick={handleItemClick}
              >
                <Icon name='money bill alternate outline'/>
                Pay Grades
              </Menu.Item>

              <Menu.Item
                style={{ color: "black"}}
                name="department"
                as={Link}
                to="/performancemanager/department-records"
                active={activeItem === "list-departments"}
                onClick={handleItemClick}
              >
                <Icon name='address card'/>
                Departments/Teams
              </Menu.Item>
              
>>>>>>> f7a7bf703cc629f4ddbbc531149b990384349fdd
            </Sidebar>
            <Sidebar.Pusher dimmed={visible}>
              <BaseRouter props={props} />
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}
