import React from 'react';
import {   Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,  } from 'reactstrap';

  const divStyle = {
    margin: '40px',
    width:'200px'
  };

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
//  console.log(this.props.data);
  let {campaignId, description,cardTitle, cardDescription,primaryMediaUrl,cardStartDate,cardEndDate,currentWorkFlow,likes, open} = data;
console.log(cardTitle)

  return (
    <div>
    <Card style={divStyle}>
       <CardImg className="card-img-top"  src={primaryMediaUrl} alt="Card image cap" />
       <CardBody>
         <CardTitle>{cardTitle}</CardTitle>
         <CardSubtitle>{cardTitle}</CardSubtitle>
         <CardText>{cardDescription}</CardText>
         <Button>Button</Button>
       </CardBody>
     </Card>
        </div>

  );
}
};
