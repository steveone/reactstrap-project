import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import CampaignJson from '../json/campaigns';
import Moment from 'react-moment';

import {  Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
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
          startDate: new Date(),
          campaigns: null
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

      componentDidMount() {
        fetch('http://localhost:8080/campaigns/')
          .then(response => response.json())
          .then(campaigns => this.setState({ campaigns }));
      }

      changeCampaign(currentCampaignName,campaignId){
        this.setState({
          currentCampaignName
        })
        this.props.changeCampaign(currentCampaignName,campaignId);
      }


render(){
  const iconColor = "lightgray";
  let campaigns = this.state.campaigns;
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
    <div className="fixed-top">
        <Navbar color="light" light expand="md" className='navWidth'>
        <NavbarToggler onClick={this.toggleNavBar} />
        <Navbar className="d-md-none">
          {this.state.currentCampaignName}
        </Navbar>
        <Collapse isOpen={this.state.isOpenNavBar} navbar>
        <Nav className="mr-auto" navbar>
        <Dropdown className="px-3" nav isOpen={this.state.isOpenNavDropDown} toggle={this.toggleNavDropDown}>
        <DropdownToggle nav caret>
          {this.state.currentCampaignName}
        </DropdownToggle>
        <DropdownMenu>
        {/*Display All Campaigns in drop down list if appropriate.*/}
        {allCampaigns}
        {/*Loop through all campaigns to build the drop down list */}
        {(campaigns == null) || campaigns.map((cur,pos,arr) => {
          return   <DropdownItem key={pos} id={cur['id']}
                    onClick={()=>{
                      this.changeCampaign(cur['campaignName'],cur['id'])}}>
                    {cur['campaignName']}
                   </DropdownItem>
        })}
        </DropdownMenu>
      </Dropdown>
      <NavItem className='align-self-center navPadding'>
      <FontAwesomeIcon color={iconColor} icon="list-ul"  size="lg" fixedWidth/>
      </NavItem>
      <NavItem className='align-self-center navPadding'>
      <div className='defaultNavColor align-self-center'>Pending</div>
      </NavItem>
      </Nav>
      <Nav>
      <NavItem className='align-self-center'>
            <FontAwesomeIcon color={iconColor} icon="search" size="lg" fixedWidth/>
            </NavItem>
            <NavItem className='px-3 align-self-center navPadding'>
              <FontAwesomeIcon className="d-none d-md-block" color="darkOrange" icon="angle-left" fixedWidth/>
              </NavItem>
              <NavItem className='navPadding'>
              <FontAwesomeIcon color="darkOrange" icon="calendar" fixedWidth/>
              <Moment calendar={calendarStrings} className='navCalendarColor'>
              {this.state.startDate}
              </Moment>
              </NavItem>
              <NavItem className='navPadding'>
              <FontAwesomeIcon className="d-none d-md-block"  color="darkOrange" icon="angle-right" fixedWidth/>
            </NavItem>
            <NavItem className='px-3 align-self-center'>
                <Badge color="danger" pill>1d</Badge>
            </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </div>

  );
}
};
