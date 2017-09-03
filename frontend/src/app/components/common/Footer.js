import React, {Component} from 'react';
import { Link } from 'react-router';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        © 2017 Sotellme Inc. All rights reserved.
      </footer>
    )
  }
}

export default Footer