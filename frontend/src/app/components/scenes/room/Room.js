import React, {Component} from 'react';
import Question from './Question';

class Room extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id="home" className="main-content">
        <Question question={this.props.question} newQuestion={this.props.newQuestion}/>
      </div>
    )
  }
}

export default Room