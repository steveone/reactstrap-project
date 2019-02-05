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
        this.updateStatus = this.updateStatus.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      updateStatus(campaignId,title,placeholder) {
           this.setState({ isLoading: true });
           fetch('http://localhost:8080/cards',
             {
                     method: "POST", // *GET, POST, PUT, DELETE, etc.
                     mode: "cors", // no-cors, cors, *same-origin
                     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                     credentials: "same-origin", // include, *same-origin, omit
                     headers: {
                         "Content-Type": "application/json",
                         // "Content-Type": "application/x-www-form-urlencoded",
                     },
                     body: JSON.stringify({campaignId,title,placeholder})// body data type must match "Content-Type" header
              }
           )
             .then(response => response.json())
             .then(cards => this.setState({ cards, isLoading: false }));
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
         <div className="col"style={{top:'-5px'}} size="sm" >
         {/*using tital for Click ID since it is unique and id isn't*/}
           <Button
              key={id}
              color={iconColor}
              style={{'fontSize': '1em',textTransform: 'capitalize'}}
              onClick={() => {
                this.updateStatus(campaignId,cardTitle,'temp')
                ;
                console.log('you clicked me ' + cardTitle )}
              }
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
