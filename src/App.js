import React, { Component } from 'react';
import './App.css';
import MyNav from './components/MyNav';
import MyCard from './components/Cards';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


library.add(fas, faTwitter)

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        currentCampaignName: 'All Campaigns',
        campaignId: 0
      };
      this.handleCampaignChange = this.handleCampaignChange.bind(this);
}

  handleCampaignChange(currentCampaignName,campaignId){
      this.setState({ currentCampaignName,campaignId });
   }

  render() {
    return (
      <div className="App">
        <MyNav changeCampaign={this.handleCampaignChange}/>
        <MyCard campaignId={this.state.campaignId}/>
      </div>
    );
  }
}

export default App;
