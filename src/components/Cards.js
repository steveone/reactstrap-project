import React from 'react';
import { Card, Spinner, CardGroup } from 'reactstrap';
import DisplayCard from './DisplayCard';
// import CardsJson from '../json/cards';

export default class MyCard extends React.Component {
  constructor(props) {
    super(props);

    this.updateWorkflow = this.updateWorkflow.bind(this);
    this.checkForUpdateCompleted = this.checkForUpdateCompleted.bind(this);

    this.state = {
      cards: null,
      isLoading: true,
      pendingTitleChange: null,
      expectedWorkflow: null,
      tryCount: 0,
    };
  }


  componentDidMount() {
    let { campaignId } = this.props;
    this.setState({ isLoading: true });
    campaignId = campaignId === 0 ? '' : campaignId;
    fetch(`http://localhost:8080/cards/${campaignId}`)
      .then(response => response.json())
      .then(cards => this.setState({ cards, isLoading: false }));
  }

  // checks for status update complete then updates cards
  checkForUpdateCompleted() {
    /*
   //in theory we should limit the tries to a specific number and then
   //notify the user it is taking too long to update.
   //Update count limit was not implmented in this version
   */
    const {
      pendingTitleChange,
      expectedWorkflow,
    } = this.state;
    let {
      tryCount,
    } = this.state;
    const title = pendingTitleChange;
    fetch(`http://localhost:8080/cards/title/${title}`)
      .then(response => response.json())
      .then((cardsReturned) => {
        let { cards } = this.state;
        if (cardsReturned[0].currentWorkflow === expectedWorkflow) {
          this.setState({
            pendingTitleChange: null,
            tryCount: 0,
            expectedWorkflow: null,
          });
          // update cards to reflect new currentWorkFlow
          cards = cards.map((cur) => {
            if (cur.cardTitle === title) {
              const current = cur;
              current.currentWorkflow = cardsReturned[0].currentWorkflow;
              current.isUpdating = false;
              return current;
            }
            return cur;
          });
          this.setState({ cards });
        } else {
          tryCount += 1;
          this.setState({
            tryCount,
          });
          // try again if we didn't get the update
          setTimeout(
            () => {
              this.checkForUpdateCompleted();
            },
            1000,
          );
        }
      });
  }

  // used to update workFlow for a specific card
  updateWorkflow(campaignId, title, newWorkflow) {
    this.setState({
      pendingTitleChange: title,
      tryCount: 0,
      expectedWorkflow: newWorkflow,
    });
    let { cards } = this.state;
    cards = cards.map((cur) => {
      if (cur.cardTitle === title) {
        const current = cur;
        current.isUpdating = true;
        return current;
      }
      return cur;
    });
    this.setState({ cards });
    fetch('http://localhost:8080/cards', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        campaignId,
        title,
        newWorkflow,
      }), // body data type must match "Content-Type" header
    }).then((response) => {
      if (response.status === 202) {
        // if update accepted is received from server, wait 1 second and check for update completion
        setTimeout(
          () => {
            this.checkForUpdateCompleted();
          },
          1000,
        );
      } else {
        // this should show on the screen to the end user vs console.log
      }
    });
  }


  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <div>
          <Card className="spinner">
            <Spinner color="primary" />
          </Card>
        </div>
      );
    }

    const { cards } = this.state;
    const { campaignId } = this.props;
    return (
      <div>
        <CardGroup className="center">
          {cards == null
            || cards
              .filter(cur => (campaignId === 0
                ? true
                : cur.campaignId === campaignId))
              .map((cur, pos) => (
                <DisplayCard
                  key={pos}
                  data={cur}
                  updateWorkflow={this.updateWorkflow}
                  locationKey={pos}
                />
              ))}
        </CardGroup>
      </div>
    );
  }
}
