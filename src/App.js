import React, { Component } from 'react';
import './App.css';
import Mybutton from './Button';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


library.add(fas, faTwitter)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Mybutton/>
      </div>
    );
  }
}

export default App;
