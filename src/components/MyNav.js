import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
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
      campaigns: null,
    };
  }


  componentDidMount() {
    fetch('http://localhost:8080/campaigns/')
      .then(response => response.json())
      .then(campaigns => this.setState({ campaigns }));
  }

  toggleNavBar() {
    const { isOpenNavBar } = this.state;
    this.setState({
      isOpenNavBar: !isOpenNavBar,
    });
  }

  toggleNavDropDown() {
    const { isOpenNavDropDown } = this.state;
    this.setState({
      isOpenNavDropDown: !isOpenNavDropDown,
    });
  }

  changeCampaign(currentCampaignName, campaignId) {
    // update campaignName and auto close open navbar (for mobile)
    const { changeCampaign } = this.props;
    this.setState({
      currentCampaignName,
      isOpenNavBar: false,

    });
    changeCampaign(currentCampaignName, campaignId);
  }


  render() {
    const {
      campaigns,
      isOpenNavBar,
      isOpenNavDropDown,
      currentCampaignName,
      startDate,
    } = this.state;
    const iconColor = 'lightgray';
    const calendarStrings = {
      lastDay: '[Yesterday] MMM DD',
      sameDay: '[Today] MMM DD',
      nextDay: '[Tomorrow] MMM DD',
      sameElse: 'MMM DD',
    };
    // determine if All Campaigns should be in the drop down list or not
    const allCampaigns = currentCampaignName !== 'All Campaigns' ? (
      <DropdownItem
        key={-1}
        id={null}
        onClick={() => {
          this.changeCampaign('All Campaigns');
        }}
      >
        {'All Camapaigns'}
      </DropdownItem>
    ) : null;
    return (
      <div className="fixed-top">
        <Navbar color="light" light expand="md" className="navWidth">
          <NavbarToggler onClick={this.toggleNavBar} />
          <Navbar className="d-md-none">
            {currentCampaignName}
          </Navbar>
          <Collapse isOpen={isOpenNavBar} navbar>
            <Nav className="mr-auto" navbar>
              <Dropdown
                className="px-3"
                nav
                isOpen={isOpenNavDropDown}
                toggle={this.toggleNavDropDown}
              >
                <DropdownToggle nav caret>
                  {currentCampaignName}
                </DropdownToggle>
                <DropdownMenu>
                  {/* Display All Campaigns in drop down list if appropriate. */}
                  {allCampaigns}
                  {/* Loop through all campaigns to build the drop down list */}
                  {/* check if campaigns is null and show loading until loaded */}
                  {campaigns == null ? (
                    <DropdownItem key="loading">loading</DropdownItem>
                  ) : (
                    campaigns.map((cur, pos) => (
                      <DropdownItem
                        key={pos}
                        id={cur.id}
                        onClick={() => {
                          this.changeCampaign(cur.campaignName, cur.id);
                        }}
                      >
                        {cur.campaignName}
                      </DropdownItem>
                    ))
                  )}
                </DropdownMenu>
              </Dropdown>
              <NavItem className="align-self-center navPadding">
                <FontAwesomeIcon
                  color={iconColor}
                  icon="list-ul"
                  size="lg"
                  fixedWidth
                />
              </NavItem>
              <NavItem className="align-self-center navPadding">
                <div className="defaultNavColor align-self-center">Pending</div>
              </NavItem>
            </Nav>
            <Nav>
              <NavItem className="align-self-center">
                <FontAwesomeIcon
                  color={iconColor}
                  icon="search"
                  size="lg"
                  fixedWidth
                />
              </NavItem>
              <NavItem className="px-3 align-self-center navPadding">
                <FontAwesomeIcon
                  className="d-none d-md-block"
                  color="darkOrange"
                  icon="angle-left"
                  fixedWidth
                />
              </NavItem>
              <NavItem className="navPadding">
                <FontAwesomeIcon
                  color="darkOrange"
                  icon="calendar"
                  fixedWidth
                />
                <Moment calendar={calendarStrings} className="navCalendarColor">
                  {startDate}
                </Moment>
              </NavItem>
              <NavItem className="navPadding">
                <FontAwesomeIcon
                  className="d-none d-md-block"
                  color="darkOrange"
                  icon="angle-right"
                  fixedWidth
                />
              </NavItem>
              <NavItem className="px-3 align-self-center">
                <Badge color="danger" pill>
                  1d
                </Badge>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
