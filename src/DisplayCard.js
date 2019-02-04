import React from 'react';
import {   Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,  } from 'reactstrap';

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
  let {campaignId, description,cardTitle, cardDescription,primaryMediaUrl,cardStartDate,cardEndDate,currentWorkFlow,likes, open} = data;

  return (
    <div>
    <Card className='cardDiv'>
       <CardImg className="card-img-top"  src={primaryMediaUrl} alt="Card image cap" />
       <CardBody>
         <CardTitle>{cardTitle}</CardTitle>
         <Button>Button</Button>
       </CardBody>
     </Card>
        </div>

  );
}
};
