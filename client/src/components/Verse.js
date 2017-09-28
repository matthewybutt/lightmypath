import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import axios from 'axios';


class Verse extends Component {
  constructor(props){
    super(props);
    this.state = {
      citation:"",
      error: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveVerse    = this.saveVerse.bind(this);

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
    this.props.findVerse(this.state);
  }

  saveVerse(e){
    e.preventDefault();
    this.props.postVerse(this.props.verse.newVerse).then(()=>this.props.fetchUser())
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter a verse:
            <input type="text" name="citation" placeholder="i.e.- Genesis 1:1" onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Search"/>
          <span style={{color: "red", padding: "0px 5px"}}>{this.state.error}</span>
          {this.props.verse && this.props.verse.error ?
            <span style={{color: "red", padding: "0px 5px"}}>{this.props.verse.error}</span>
            :
            null
          }
        </form>
        {this.props.verse.newVerse && this.props.verse.newVerse.citation ?
          <div>
            <p>Here's the verse you searched for-</p>
            <br/>
            <h4>{this.props.verse.newVerse.text}</h4>
            <p>{this.props.verse.newVerse.citation}</p>
            <br/>
            <p>Click the button below to save your verse</p>
            <button onClick={this.saveVerse}>Save Verse</button>
          </div>
          : null
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
