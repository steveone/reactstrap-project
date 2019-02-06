import React from 'react';
import {  Card, Spinner, CardGroup } from 'reactstrap';
import DisplayCard from './DisplayCard';
//import CardsJson from '../json/cards';

export default class MyCard extends React.Component {

  constructor(props) {
      super(props);
      this.updateStatus = this.updateStatus.bind(this);
      this.state = {
        cards: null,
        isLoading: true
      };
}

updateStatus(campaignId,title,newWorkflow) {
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
               body: JSON.stringify({campaignId,title,newWorkflow})// body data type must match "Content-Type" header
        }
     )
       .then(response => response.json())
       .then(cards => this.setState({ cards, isLoading: false }));
   }

  componentDidMount() {
    this.setState({ isLoading: true });
    let campaignId = (this.props.campaignId === 0) ? "" :this.props.campaignId;
    fetch('http://localhost:8080/cards/' + campaignId)
      .then(response => response.json())
      .then(cards => this.setState({ cards, isLoading: false }));
  }


render(){
  if (this.state.isLoading) {
        return (
        <div>
        <Card className='spinner'>
        <Spinner color="primary"/>
        </Card>
        </div>

      )
      }

  let cards = this.state.cards;
  let campaignId = this.props.campaignId;
  return (
    <div>
  <CardGroup className='center'>
  {(cards == null) || cards.filter((cur, i) => {
    return (campaignId === 0) ? true : cur['campaignId'] === campaignId
})
    .map((cur,pos,arr) => {
    return <DisplayCard
            key = {pos}
            data = {cur}
            updateStatus = {this.updateStatus}
             />
  })}
  </CardGroup>
        </div>

  );
}
};
