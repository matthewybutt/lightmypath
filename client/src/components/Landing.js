import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {

  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <h1 style={{marginBottom: "0"}}>LMP</h1>
        <p style={{marginTop: "0"}}>Light | My | Path</p>
        <p>Memorize verses today!</p>
        {this.props.auth ?
          <div className="row">
            <div className="col s6" style={{textAlign:"right"}}>
              <Link to={"/verse/new"}><button className="btn waves-effect waves-light blue darken-1">New Verse</button></Link>
            </div>
            <div className="col s6" style={{textAlign:"left"}}>
              <Link to={"/verse/my_verses"}><button className="btn waves-effect waves-light blue darken-1">My Verses</button></Link>
            </div>
          </div>
          :
          <a href="/auth/google"><button className="btn waves-effect waves-light blue darken-1">Log In</button></a>
        }
      </div>
    )
  }
}

function mapStateToProps({auth}) {
  return { auth }
}

export default connect(mapStateToProps)(Landing);
