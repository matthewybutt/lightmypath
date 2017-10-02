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
    this.props.findVerse(this.state).then(()=>this.setState({showVerse:true}));
  }

  saveVerse(e){
    e.preventDefault();
    this.props.postVerse(this.props.verse.newVerse)
      .then(()=>this.props.fetchUser())
      .then(()=>this.props.history.push('/verse/my_verses'))
  }

  searchAgain(e){
    e.preventDefault();
    this.setState({showVerse:false});
  }

  render() {
    console.log(this.props)
        // {this.props.verse.newVerse && this.props.verse.newVerse.citation ?
    return (
      <div className="row" style={{padding:"25px"}}>
        {this.state.showVerse ?
          <div>
            <p>Here's the verse you searched for-</p>
            <h5>{this.props.verse.newVerse.text}</h5>
            <p style={{textAlign: "right", paddingRight: "20px"}}>-{this.props.verse.newVerse.citation}</p>
            <br/>
            <div className="row" style={{textAlign: "center"}}>
              <div className="col s6">
                <button className="btn waves-effect waves-light red darken-4" onClick={this.saveVerse}>Save Verse</button>
              </div>
              <div className="col s6">
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
