import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import axios from 'axios';


class Verse extends Component {
  constructor(props){
    super(props);
    this.state = {
      citation:"",
      error: "",
      showVerse: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveVerse    = this.saveVerse.bind(this);
    this.searchAgain    = this.searchAgain.bind(this);

  }

  handleChange(e){
    this.setState({citation: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    // if (this.state.citation === ""){
    //   this.setState({error: "Please enter a verse!"});
    // } else {
    //   this.setState({error: ""});
    // }
    // this.props.postVerse(this.state);

    if(this.state.citation.length > 0){
      this.props.findVerse(this.state).then(()=>this.setState({showVerse:true, error: ""}));
    } else {
      this.setState({error: "Please enter a verse!"});
    }
  }

  saveVerse(e){
    e.preventDefault();
    this.props.postVerse(this.props.verse.newVerse)
      .then(()=>this.props.fetchUser())
      .then(()=>this.props.history.push('/verse/my_verses'))
  }

  searchAgain(e){
    e.preventDefault();
    this.setState({
      citation:"",
      error: "",
      showVerse: false
    });
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    return (
      <div className="row" style={{padding:"25px"}}>
        <h3>New Verse</h3>
        {this.state.showVerse && this.props.verse.newVerse ?
          <div>
            <h5>Here's the verse you searched for-</h5>
            <div className="card">
              <div className="card-content">
                <p className="card-title">{this.props.verse.newVerse.citation}</p>
                <p>{this.props.verse.newVerse.text}</p>
              </div>
              <div className="card-action" style={{textAlign: "center"}}>
                <button className="btn waves-effect waves-light red darken-4" onClick={this.saveVerse}>Save Verse</button>
                <button className="btn-flat waves-effect waves-light" style={{color:"red"}} onClick={this.searchAgain}>Search Again</button>
              </div>
            </div>
          </div>
          :
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row" >
              <div className="input-field col s12" >
                <input id="citation" type="text" placeholder="i.e.- John 3:16" className="validate" onChange={this.handleChange}/>
                <label htmlFor="citation" className="active">Enter a verse:</label>
              </div>
            </div>
            <button className="btn waves-effect waves-light red darken-4" type="submit">Search</button>
            <span style={{color: "red", padding: "0px 5px"}}>{this.state.error}</span>
            {this.props.verse && this.props.verse.error ?
              <span style={{color: "red", padding: "0px 5px"}}>{this.props.verse.error}</span>
              :
              null
            }
          </form>
        }
      </div>
    )
  }
}

function mapStateToProps(props) {
  return props
}

export default connect(mapStateToProps, actions)(Verse);
// export default Verse;
