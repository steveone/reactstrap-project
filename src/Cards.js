import React from 'react';
import {  CardGroup} from 'reactstrap';
import DisplayCard from './DisplayCard';
import CardsJson from './json/cards';

    export default class MyCard extends React.Component {




render(){
  return (
    <div>
  <CardGroup >
  {CardsJson.map((cur,pos,arr) => {
    return <DisplayCard key = {pos}  data = {cur}/>
  })}
  </CardGroup>
        </div>

  );
}
};
