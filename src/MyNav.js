import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CampaignJson from './json/campaigns';
import Moment from 'react-moment';

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
          currentCampaignName: 'All Campaigns',
          startDate: new Date()

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
/*
      handleDateChange(date) {
        this.setState({
          startDate: date
        });
      }*/

      changeCampaign(currentCampaignName,campaignId){
        this.setState({
          currentCampaignName
        })
        this.props.changeCampaign(currentCampaignName,campaignId);
      }


render(){
  const iconColor = "lightgray";

  const calendarStrings = {
      lastDay : '[Yesterday] MMM DD',
      sameDay : '[Today] MMM DD',
      nextDay : '[Tomorrow] MMM DD',
      sameElse : 'MMM DD'
  };
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
        <Dropdown  nav isOpen={this.state.isOpenNavDropDown} toggle={this.toggleNavDropDown}>
        <DropdownToggle nav caret>
          {this.state.currentCampaignName}
        </DropdownToggle>
        <DropdownMenu>
        {/*Display All Campaigns in drop down list if appropriate.*/}
        {allCampaigns}
        {/*Loop through all campaigns to build the drop down list */}
        {CampaignJson.map((cur,pos,arr) => {
          return   <DropdownItem key={pos} id={cur['id']}
                    onClick={()=>{
                      this.changeCampaign(cur['campaignName'],cur['id'])}}>
                    {cur['campaignName']}
                   </DropdownItem>

        })}
        </DropdownMenu>
      </Dropdown>
      <FontAwesomeIcon color={iconColor} icon="list-ul" className='align-self-center' size="lg" fixedWidth/>
      <div className='defaultNavColor align-self-center'>Pending</div>
        </Nav>
          <NavbarToggler onClick={this.toggleNavBar} />
          <Collapse isOpen={this.state.isOpenNavBar} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem className='align-self-center'>
            <FontAwesomeIcon color={iconColor} icon="search" size="lg" fixedWidth/>
            </NavItem>
            <NavItem className='align-self-center'>
            <FontAwesomeIcon color={iconColor} icon="angle-left" size="md" fixedWidth/>
            <FontAwesomeIcon color={iconColor} icon="calendar" size="md" fixedWidth/>
            <Moment calendar={calendarStrings} className='defaultNavColor'>
            {this.state.startDate}
            </Moment>
            <FontAwesomeIcon color={iconColor} icon="angle-right" size="md`" fixedWidth/>
            </NavItem>
                <NavItem className='align-self-center'>
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
