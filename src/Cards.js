import React from 'react';
import {  CardGroup} from 'reactstrap';
import DisplayCard from './DisplayCard';
import CardsJson from './json/cards';

export default class MyCard extends React.Component {

render(){
  let campaignId = this.props.campaignId;
  return (
    <div>
  <CardGroup className='center'>
  {CardsJson.filter((cur, i) => {
    return (campaignId === 0) ? true : cur['campaignId'] === campaignId
})
    .map((cur,pos,arr) => {
    return <DisplayCard key = {pos}  data = {cur}/>
  })}
  </CardGroup>
        </div>

  );
}
};
