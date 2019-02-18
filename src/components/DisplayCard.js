import React from 'react';
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
  DropdownMenu,
  Spinner,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class DisplayCard extends React.Component {
  constructor(props) {
    super(props);
    const { updateWorkflow } = this.props;
    this.toggleButtonDropDown = this.toggleButtonDropDown.bind(this);
    this.updateWorkflow = updateWorkflow.bind(this);

    this.state = {
      buttonDropDownOpen: false,
    };
  }

  // this is used to handle state for the currentWorkflow button that allows workflow changes
  toggleButtonDropDown() {
    const { buttonDropDownOpen } = this.state;
    this.setState({
      buttonDropDownOpen: !buttonDropDownOpen,
    });
  }


  render() {
    const { data, locationKey } = this.props;
    const { buttonDropDownOpen } = this.state;
    /* workflow logic in object of arrays */
    const states = {
      saved: ['pending'],
      pending: ['active', 'declined'],
      active: ['paused', 'terminated', 'expired'],
      paused: ['active'],
    };
    /* destructure card data */
    const {
      campaignId,
      currentWorkflow,
      listOfPlans,
      subscribers,
      views,
      totalRevenue,
      cardTitle,
      primaryMediaUrl,
      isUpdating,
    } = data;
    // using the key from props allows us to have a different picture for each card
    const key = locationKey;
    const plan = listOfPlans[0].price;
    // builds string required for unique image per card using key from above
    const primaryMediaUrlRandom = `${primaryMediaUrl}?random${key}`;
    // get this workflows possible states into it's own array
    const futureStates = states[currentWorkflow] !== null && states[currentWorkflow] !== undefined
      ? states[currentWorkflow]
      : ['empty'];
    const { amount, currencySymbol } = plan;
    const iconColor = 'lightgray';
    return (
      <div>
        <Card className="cardDiv">
          <CardImg
            className="card-img-top"
            src={primaryMediaUrlRandom}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>{cardTitle}</CardTitle>
            <CardBody className="container-fluid">
              <div className="row small">
                <div className="col">
                  {currencySymbol}
                  {' '}
                  {amount}
                  {' '}
/ Month
                </div>
                <div className="col" style={{ top: '-5px' }} size="sm">
                  {/* using tital for Click ID since it is unique and id isn't */}
                  <ButtonDropdown
                    isOpen={buttonDropDownOpen}
                    toggle={this.toggleButtonDropDown}
                  >
                    <DropdownToggle
                      color="lightgray"
                      style={{ top: '-5px' }}
                      size="sm"
                    >
                      {(isUpdating === true) ? <Spinner color="primary" /> : currentWorkflow}
                    </DropdownToggle>
                    <DropdownMenu>
                      {/* Loop over all workflows to create drop down with onl valid
                        future results */}
                      {futureStates.map(cur => (
                        <DropdownItem
                          key={cur + cardTitle}
                          onClick={() => {
                            // don't allow click if no further action can be taken
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
                  <FontAwesomeIcon icon="database" color={iconColor} />
                  {' '}
                  {totalRevenue}
                </div>
                <div className="col">
                  <FontAwesomeIcon icon="user" color={iconColor} />
                  {' '}
                  {subscribers}
                </div>
                <div className="col">
                  <FontAwesomeIcon icon="eye" color={iconColor} />
                  {' '}
                  {views}
                </div>
              </div>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
    );
  }
}
