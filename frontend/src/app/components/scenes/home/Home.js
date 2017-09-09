import React, {Component} from 'react';
import PhoneInput from '../../snippets/PhoneInput';
import { Link } from 'react-router'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  get homeContent(){
    if(this.props.awaitingRoom){
      return <PhoneInput saveNumber={this.props.saveNumber}/>
    }
    else if (!this.props.awaitingRoom){
      return <p>Thanks for giving us your number. Stay here and keep your phone close, we'll connect you as soon as another user joins. </p>
    }

  }
  
  render() {
    return (
      <div id="home" className="main-content">
        So Tell Me...
        {this.homeContent}
        <Link to="/room/1234">Test</Link>
      </div>
    )
  }
}

export default Home