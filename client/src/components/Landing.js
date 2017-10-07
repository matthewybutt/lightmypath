import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return(
    <div style={{textAlign: 'center'}}>
      <h1 style={{marginBottom: "0"}}>LMP</h1>
      <p style={{marginTop: "0"}}>Light | My | Path</p>
      <p>Memorize verses today!</p>
      <div className="row">
        <div className="col s6" style={{textAlign:"right"}}>
          <Link to={"/verse/new"}><button className="btn waves-effect waves-light red darken-4">New Verse</button></Link>
        </div>
        <div className="col s6" style={{textAlign:"left"}}>
          <Link to={"/verse/my_verses"}><button className="btn waves-effect waves-light red darken-4">My Verses</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Landing;
