import React from "react";
import { Card, Spinner, CardGroup } from "reactstrap";
import DisplayCard from "./DisplayCard";
//import CardsJson from '../json/cards';

export default class MyCard extends React.Component {
  constructor(props) {
    super(props);

    this.updateWorkflow = this.updateWorkflow.bind(this);
    this.checkForUpdateCompleted = this.checkForUpdateCompleted.bind(this);

    this.state = {
      cards: null,
      isLoading: true,
      isUpdatePending: true,
      pendingTitleChange: null,
      expectedWorkflow: null,
      tryCount: 0
    };
  }

  //checks for status update complete then updates cards
  checkForUpdateCompleted() {
    /*
   //in theory we should limit the tries to a specific number and then
   //notify the user it is taking too long to update.
   //Update count limit was not implmented in this version
   */
    let tryCount = this.state.tryCount;
    let title = this.state.pendingTitleChange;
    fetch(`http://localhost:8080/cards/title/${title}`)
      .then(response => response.json())
      .then(cardsReturned => {
        let cards = this.state.cards;
        if (cardsReturned[0].currentWorkflow === this.state.expectedWorkflow) {
          this.setState({
            isUpdatePending: false,
            pendingTitleChange: null,
            tryCount: 0,
            expectedWorkflow: null
          });
          //update cards to reflect new currentWorkFlow
          cards = cards.map(cur => {
            if (cur["cardTitle"] === title) {
              cur["currentWorkflow"] = cardsReturned[0].currentWorkflow;
              cur["isUpdating"]=false;
              return cur;
            }
            return cur;
          });
          this.setState({ cards });
        } else {
          tryCount++;
          this.setState({
            tryCount
          });
          //try again if we didn't get the update
          setTimeout(
            function() {
              this.checkForUpdateCompleted();
            }.bind(this),
            1000
          );
        }
      });
  }

  //used to update workFlow for a specific card
  updateWorkflow(campaignId, title, newWorkflow) {
    this.setState({
      isUpdatePending: true,
      pendingTitleChange: title,
      tryCount: 0,
      expectedWorkflow: newWorkflow
    });
    let cards = this.state.cards;
    cards = cards.map(cur => {
      if (cur["cardTitle"] === title) {
        cur["isUpdating"]=true;
        return cur;
      }
      return cur;
    });
    this.setState({ cards });
    fetch("http://localhost:8080/cards", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ campaignId, title, newWorkflow }) // body data type must match "Content-Type" header
    }).then(response => {
      if (response.status === 202) {
        //if update accepted is received from server, wait 1 second and check for update completion
        setTimeout(
          function() {
            this.checkForUpdateCompleted();
          }.bind(this),
          1000
        );
      } else {
        //this should show on the screen to the end user vs console.log
        console.log(
          `Received an unexpected reply of status code ${response.status}`
        );
      }
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    let campaignId = this.props.campaignId === 0 ? "" : this.props.campaignId;
    fetch("http://localhost:8080/cards/" + campaignId)
      .then(response => response.json())
      .then(cards => this.setState({ cards, isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Card className="spinner">
            <Spinner color="primary" />
          </Card>
        </div>
      );
    }

    let cards = this.state.cards;
    let campaignId = this.props.campaignId;
    return (
      <div>
        <CardGroup className="center">
          {cards == null ||
            cards
              .filter((cur, i) => {
                return campaignId === 0
                  ? true
                  : cur["campaignId"] === campaignId;
              })
              .map((cur, pos, arr) => {
                return (
                  <DisplayCard
                    key={pos}
                    data={cur}
                    updateWorkflow={this.updateWorkflow}
                    locationKey={pos}
                  />
                );
              })}
        </CardGroup>
      </div>
    );
  }
}
