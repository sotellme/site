import React, {Component} from 'react';
import Button from '../../snippets/Button'

class Question extends Component {
  constructor(props) {
    super(props);
  }

  nextQuestion() {
    return this.props.newQuestion()
  }
  
  render() {
    return (
      <div id="question">
        <p>{this.props.question.text}</p>
        <Button handleClick={this.nextQuestion.bind(this)} text="Next Question"/>
      </div>
    )
  }
}

export default Question;
