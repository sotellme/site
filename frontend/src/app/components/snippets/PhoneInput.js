import React, {Component} from 'react';


class PhoneInput extends Component {
  constructor(props) {
    super(props);
  }
  
  saveNumber(e){
    e.preventDefault();
    // todo reg ex check phone 
    const number = e.target.phoneNumber.value;
    return this.props.saveNumber(number)
  }

  render() {
    return (
      <form onSubmit={this.saveNumber.bind(this)}>
        <input type="tel" name="phoneNumber"/>
      </form>
    )
  }
}

export default PhoneInput