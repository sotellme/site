import React, { Component } from 'react';
import MainNav from './common/MainNav';
import Footer from './common/Footer';
import utils from '../utils/utils';
import QuestionService from '../utils/QuestionService'
require('isomorphic-fetch');

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      BASE_URL:"https://www.sotellme.ca",
      numberSent:false,
      awaitingRoom:true,
      question:{text:"Given the choice of anyone in the world, whom would you want as a dinner guest?"}
    }
    this._socket = SocketChannel.startSocket(this.state.BASE_URL);
  }

  get socket() {
    return this._socket;
  }

  updateQuestion(questionId){
    return QuestionService.retrieveQuestion(questionId)
    .then((question)=>{
      this.setState({question})
    })
  }

  resetState(){
    this.setState({
      numberSent:false,
      awaitingRoom:true
    })
  }

  newQuestion(){
    return SocketChannel.newQuestion(this._socket)
  }

  saveNumber(number){
    return SocketChannel.sendNumber(this._socket, {number})
    .then(()=>{
      this.setState({numberSent:true, awaitingRoom:false}, ()=>{
        return Promise.resolve();
      })
    })
  }

  render() {
    let mainContent = React.cloneElement({...this.props}.children, {...this.props})
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
         saveNumber: this.saveNumber.bind(this), 
         numberSent: this.state.numberSent,
         awaitingRoom: this.state.awaitingRoom, 
         question:this.state.question,
         newQuestion:this.newQuestion.bind(this),
     }))
    return (
      <div id="main">
        <MainNav {...this.props}/>
        {childrenWithProps}
        <Footer/>
      </div>
    );
  }
}

export default App;

import SocketChannel from '../utils/SocketChannel'