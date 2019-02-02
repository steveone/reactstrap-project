import React from 'react';
import {   Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,  CardGroup} from 'reactstrap';

  const divStyle = {
    margin: '40px',
    width:'200px'
  };

    export default class MyCard extends React.Component {
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
render(){
  return (
    <div>
  <CardGroup >
    <Card style={divStyle}>
       <CardImg className="card-img-top"  src="https://loremflickr.com/750/400" alt="Card image cap" />
       <CardBody>
         <CardTitle>Card title</CardTitle>
         <CardSubtitle>Card subtitle</CardSubtitle>
         <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
         <Button>Button</Button>
       </CardBody>
     </Card>
     <Card style={divStyle}>
            <CardImg top  src="https://loremflickr.com/750/400" alt="Card image cap" />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card style={divStyle}>
                 <CardImg top  src="https://loremflickr.com/750/400" alt="Card image cap" />
                 <CardBody>
                   <CardTitle>Card title</CardTitle>
                   <CardSubtitle>Card subtitle</CardSubtitle>
                   <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                   <Button>Button</Button>
                 </CardBody>
               </Card>
               <Card style={divStyle}>
                      <CardImg top  src="https://loremflickr.com/750/400" alt="Card image cap" />
                      <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the cards content.</CardText>
                        <Button>Button</Button>
                      </CardBody>
                    </Card>

          </CardGroup>
        </div>

  );
}
};
