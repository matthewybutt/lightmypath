import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component {
  renderContent() {
    switch(this.props.auth){
      case null:
        return;
      case false:
        return <li key="login"><a href="/auth/google">Login with Google</a></li>;
      default:
        return [
          <li key="1"><Link to={"/verse/my_verses"}>My Verses</Link></li>,
          <li key="2"><Link to={"/verse/new"}>New Verse</Link></li>,
          <li key="3"><a href="/api/logout">Log Out</a></li>
        ]
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={'/'} className="left brand-logo">LMP</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({auth}) {
  return { auth }
}

export default connect(mapStateToProps)(Header);
