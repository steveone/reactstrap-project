import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardFooter,
  Progress,
  ButtonDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class DisplayCard extends React.Component {
  constructor(props) {
    super(props);
    this.toggleButtonDropDown = this.toggleButtonDropDown.bind(this);
    this.updateWorkflow = this.props.updateWorkflow.bind(this);

    this.state = {
      buttonDropDownOpen: false,
    };
  }

  //this is used to handle state for the currentWorkflow button that allows workflow changes
  toggleButtonDropDown() {
    this.setState({
      buttonDropDownOpen: !this.state.buttonDropDownOpen
    });
  }


  render(props) {
    const data = this.props.data;

    const states = {
      saved: ["pending"],
      pending: ["active", "declined"],
      active: ["paused", "terminated", "expired"],
      paused: ["active"],
    };

    let {
      campaignId,
      currentWorkflow,
      listOfPlans,
      subscribers,
      views,
      totalRevenue,
      cardTitle,
      primaryMediaUrl
    } = data;
    let plan = listOfPlans[0]["price"];
    //get this workflows possible states into it's own array
    let futureStates =
      states[currentWorkflow] !== null && states[currentWorkflow] !== undefined
        ? states[currentWorkflow]
        : ["empty"];
    let { amount, currencySymbol } = plan;
    const iconColor = "lightgray";
    return (
      <div>
        <Card className="cardDiv">
          <CardImg
            className="card-img-top"
            src={primaryMediaUrl}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{cardTitle}</CardTitle>
            <CardBody className="container-fluid">
              <div className="row small">
                <div className="col">
                  {currencySymbol} {amount} / Month
                </div>
                <div className="col" style={{ top: "-5px" }} size="sm">
                  {/*using tital for Click ID since it is unique and id isn't*/}
                  <ButtonDropdown
                    isOpen={this.state.buttonDropDownOpen}
                    toggle={this.toggleButtonDropDown}
                  >
                    <DropdownToggle
                      color={"lightgray"}
                      style={{ top: "-5px" }}
                      size="sm"
                    >
                      {currentWorkflow}
                    </DropdownToggle>
                    <DropdownMenu>
                      {futureStates.map(cur => (
                        <DropdownItem
                          key={cur + cardTitle}
                          onClick={() => {
                            //don't allow click if no further action can be taken
                            if (cur !== 'empty') {
                              this.updateWorkflow(campaignId, cardTitle, cur);
                            }
                          }}
                        >
                          {(cur !== 'empty') ? cur : 'You are in the final state'}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
              </div>
              <Progress value="100" />
            </CardBody>
            <CardFooter color="lightgray" className="container-fluid">
              <div className="row">
                <div className="col">
                  <FontAwesomeIcon icon="database" color={iconColor} />{" "}
                  {totalRevenue}
                </div>
                <div className="col">
                  <FontAwesomeIcon icon="user" color={iconColor} />{" "}
                  {subscribers}
                </div>
                <div className="col">
                  <FontAwesomeIcon icon="eye" color={iconColor} /> {views}
                </div>
              </div>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
    );
  }
}
