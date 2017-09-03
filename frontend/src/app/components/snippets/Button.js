import React, {Component} from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <button 
      onClick={this.props.handleClick} 
      value={this.props.text} 
      className={`${this.props.type} basic-button`}
      data-value={this.props.dataValue || ""}
      data-param={this.props.dataParam || ""}
      key={this.props.index}>
        {this.props.text}
      </button>
    )
  }
}

export default Button