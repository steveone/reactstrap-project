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
  DropdownMenu
  } from 'reactstrap';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  export default class DisplayCard extends React.Component {
    constructor(props) {
        super(props);
        this.toggleButtonDropDown = this.toggleButtonDropDown.bind(this);
        this.state = {
          buttonDropDownOpen:false
        };
      }

      toggleButtonDropDown() {
        this.setState({
          buttonDropDownOpen: !this.state.buttonDropDownOpen
        });
      }




render(props){
  const data = this.props.data
  let {id, campaignId,currentWorkflow,listOfPlans, subscribers, views, totalRevenue, cardTitle, primaryMediaUrl} = data;
  let plan = listOfPlans[0]['price'];
//  console.log(plan);
  let {amount,currencySymbol} = plan;
  const iconColor = "lightgray";
  return (
    <div>
    <Card className='cardDiv'>
       <CardImg className="card-img-top"  src={primaryMediaUrl} alt="Card image cap" />
       <CardBody>
         <CardTitle>{cardTitle}</CardTitle>
        <CardBody className="container-fluid">
        <div className="row small">
        <div className="col">
          {currencySymbol} {amount} / Month
         </div>
         <div className="col" style={{top:'-5px'}} size="sm" >
         {/*using tital for Click ID since it is unique and id isn't*/}
           <ButtonDropdown isOpen={this.state.buttonDropDownOpen} toggle={this.toggleButtonDropDown}
              >
              <DropdownToggle color="lightgray" style={{top:'-5px'}} size="sm">
                {currentWorkflow}
              </DropdownToggle>
              <DropdownMenu>
              <DropdownItem
              onClick={() => {
                this.props.updateStatus(campaignId,cardTitle,'temp')
                }
              }
              >Action</DropdownItem>
              <DropdownItem>2</DropdownItem>
              </DropdownMenu>
           </ButtonDropdown>
        </div>
        </div>
         <Progress value="100" />
         </CardBody>
         <CardFooter color="lightgray" className="container-fluid">
         <div className="row">
          <div className="col">
          <FontAwesomeIcon icon="database" color={iconColor}/> {totalRevenue}
          </div>
          <div className="col">
         <FontAwesomeIcon icon="user" color={iconColor}/> {subscribers}
         </div>
         <div className="col">
         <FontAwesomeIcon icon="eye" color={iconColor}/> {views}
         </div>
        </div>
         </CardFooter>
       </CardBody>
     </Card>
        </div>

  );
}
};
