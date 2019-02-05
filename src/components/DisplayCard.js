import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardFooter,
  Progress,
  Button
  } from 'reactstrap';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


    export default class DisplayCard extends React.Component {
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
render(props){
  const data = this.props.data
  let {currentWorkflow,listOfPlans, subscribers, views, totalRevenue, cardTitle, primaryMediaUrl} = data;
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
         <div className="col" style={{top:'-5px'}} size="sm">
           <Button
              color={iconColor}
              style={{'fontSize': '1em',textTransform: 'capitalize'}}
              onClick={() => "console.log('you clicked me')"}
              >
            {currentWorkflow}
           </Button>
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
