import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CampaignJson from './json/campaigns';


import {  Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge
     } from 'reactstrap';

    export default class MyNav extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavBar = this.toggleNavBar.bind(this);
        this.toggleNavDropDown = this.toggleNavDropDown.bind(this);
        this.changeCampaign = this.changeCampaign.bind(this);

        this.state = {
          isOpenNavBar: false,
          isOpenNavDropDown: false,
          currentCampaignName: 'All Campaigns'
        };
      }
      toggleNavBar() {
        this.setState({
          isOpenNavBar: !this.state.isOpenNavBar
        });
      }
      toggleNavDropDown() {
        this.setState({
          isOpenNavDropDown: !this.state.isOpenNavDropDown
        });
      }

      changeCampaign(currentCampaignName){
        this.setState({
          currentCampaignName
        })
      }


render(){

  //determine if All Campaigns should be in the drop down list or not
  let allCampaigns = (this.state.currentCampaignName !== 'All Campaigns') ?
  <DropdownItem key={-1} id={null}
            onClick={()=>{this.changeCampaign('All Campaigns')}}>
            {'All Camapaigns'}
           </DropdownItem>
       : null

  return (
    <div>
        <Navbar color="light" light expand="md">
        <Nav className="ml-auto" navbar>
        <Dropdown  nav inNavBar isOpen={this.state.isOpenNavDropDown} toggle={this.toggleNavDropDown}>
        <DropdownToggle nav caret>
          {this.state.currentCampaignName}
        </DropdownToggle>
        <DropdownMenu>
        {/*Display All Campaigns in drop down list if appropriate.*/}
        {allCampaigns}
        {/*Loop through all campaigns to build the drop down list */}
        {CampaignJson.map((cur,pos,arr) => {
          return   <DropdownItem key={pos} id={cur['id']}
                    onClick={()=>{this.changeCampaign(cur['campaignName'])}}>
                    {cur['campaignName']}
                   </DropdownItem>

        })}
        </DropdownMenu>
      </Dropdown>
      <FontAwesomeIcon icon="list-ul" size="lg" fixedWidth/>

        </Nav>
          <NavbarToggler onClick={this.toggleNavBar} />
          <Collapse isOpen={this.state.isOpenNavBar} navbar>
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
              <NavItem>
              <Badge color="secondary" pill>1d</Badge>
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
