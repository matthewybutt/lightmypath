import React, { Component } from "react";
import { Link } from 'react-router-dom';


class verseCards extends Component {

  createVerseCards(verses){
    let cards = []

    verses.forEach((verse, i) => {
      let card = <div className="col s12 m6" key={i} onClick={(e) => this.props.selectVerse(verse)}>
          <div className="card">
            <div className="card-content">
              <span className="card-title">{verse.citation}</span>
              <p>{verse.text}</p>
            </div>
            <div className="card-action">
              <div className="row" style={{textAlign: "center"}}>
                <div className="col s6">
                  <Link to={"/memorize"}><button className="btn waves-effect waves-light grey darken-3">Memorize</button></Link>
                </div>
                <div className="col s6">
                  <button className="btn-flat waves-effect waves-light" style={{color: "red"}} onClick={(e) => this.props.deleteVerse(verse)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      cards.push(card)
    })
    return cards
  }

  render(){
    return(
      <div className="row">
        {this.props.verses.length ?
          this.createVerseCards(this.props.verses)
          :
          <p className="col s12">No verses!</p>
        }

      </div>
    )
  }
}

export default verseCards;
