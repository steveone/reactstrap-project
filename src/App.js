import React, {Component} from 'react';
import './css/App.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import MyNav from './components/MyNav';
import MyCard from './components/Cards';

library.add(fas, faTwitter);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCampaignName: 'All Campaigns',
      campaignId: 0,
    };
    this.handleCampaignChange = this.handleCampaignChange.bind(this);
  }

  handleCampaignChange(currentCampaignNameNew, campaignIdNew) {
    let {currentCampaignName, campaignId} = this.state;
    if (
      currentCampaignName !== currentCampaignNameNew ||
      campaignId !== campaignIdNew
    ) {
      campaignId = campaignIdNew;
      currentCampaignName = currentCampaignNameNew;
      this.setState({currentCampaignName, campaignId});
    }
  }

  render() {
    const {campaignId} = this.state;
    return (
      <div className="App">
        <MyNav changeCampaign={this.handleCampaignChange} />
        <MyCard campaignId={campaignId} />
      </div>
    );
  }
}

export default App;
