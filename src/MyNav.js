import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import {  Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
     } from 'reactstrap';

    export default class MyNav extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
render(){
  return (
    <div>
        <Navbar color="light" light expand="md">
        <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          All Campaigns
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            Option 1
          </DropdownItem>
          <DropdownItem>
            Option 2
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            Reset
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
        </Nav>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
            <FontAwesomeIcon icon="search" size="lg" fixedWidth/>
            </NavItem>

            <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
{/*
        <Button color="danger" size="large">Danger!</Button>
*/}
        </div>

  );
}
};
