import React from 'react/addons';
import {Link} from 'react-router'
import _ from 'lodash';

let Header = React.createClass({
  propTypes: {
    displayName: React.PropTypes.string,
    email: React.PropTypes.string,
    id: React.PropTypes.string
  },

  render() {
    return (
      <nav className="navbar coffee-navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#coffee-navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to={`/slots`}></Link>
          </div>
          <div className="collapse navbar-collapse" id="coffee-navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="https://github.com/phoenixbox">Shane Rogers</a></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
})

export default Header
