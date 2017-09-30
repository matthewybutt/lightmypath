import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from '../actions';
import VerseCards from './verseCards'

class MyVerses extends Component {
  constructor(props){
    super(props);

    this.selectVerse = this.selectVerse.bind(this);
    this.deleteVerse = this.deleteVerse.bind(this);

  }

  selectVerse(verse){
    console.log(verse)
    this.props.fetchVerse(verse)
  }

  deleteVerse(verse){
    this.props.deleteVerse(verse).then(()=>this.props.fetchUser())
  }

  render() {
    console.log(this.props)
    return(
      <div>
        <h1>My Verses</h1>
        <h5>Select a verse to memorize</h5>
        {this.props.auth && this.props.auth.verses ?
          <VerseCards verses={this.props.auth.verses} fetchUser={this.props.fetchUser} selectVerse={this.selectVerse} deleteVerse={this.deleteVerse}/>
          :
          null
        }
      </div>
    )
  }
}

function mapStateToProps(props) {
  return props
}

export default connect(mapStateToProps, actions)(MyVerses)
