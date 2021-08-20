import React, { Component } from "react";
import {
  Dropdown,
  Container,
  Sidebar,
  Menu,
  Button,
  Icon,
  Input,
  Image,
} from "semantic-ui-react";
import { Link } from "@reach/router";
import "../root.scss";

class Navbar extends Component {
  state = { visible: false };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });
  render() {
    const { visible } = this.state;
    return (
      <div>
        <Menu id="navbar">
          <Menu.Item>
            <Button
              id="menu-btn"
              disabled={visible}
              onClick={this.handleShowClick}
            >
              <Icon className="ui large" id="menu-ic" name="bars"></Icon>
            </Button>
          </Menu.Item>
        </Menu>
        <Sidebar
          as={Menu}
          animation="overlay"
          id="sidebar"
          direction="left"
          icon="labeled"
          inverted
          onHide={this.handleSidebarHide}
          pointing
          vertical
          visible={visible}
          width="wide"
        >
          <Menu.Item textAlign="left">
            <Input
              id="side-srch"
              action={{ type: "submit", icon: "search" }}
              placeholder="Search..."
            />
          </Menu.Item>
          <Menu.Item as="a" textAlign="left">
            <Icon.Group>
              <Icon name="dashboard" />
            </Icon.Group>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item as="a" textAlign="left">
            <Icon.Group>
              <Icon name="users" />
            </Icon.Group>
            <Link to="/employees">Employees</Link>
          </Menu.Item>
        </Sidebar>
      </div>
    );
  }
}
export default Navbar;
