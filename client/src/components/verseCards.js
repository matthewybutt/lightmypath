import React, { Component } from "react";
import { Link } from 'react-router-dom';


class verseCards extends Component {

  createVerseCards(verses){
    let cards = []
    verses.forEach((verse, i) => {
      let card = <div key={i} style={{border:"1px solid black", margin:"5px", padding:"5px"}} >
          <div onClick={(e) => this.props.selectVerse(verse)}>
            <Link to={"/memorize"}>
              <p>{verse.text}</p>
              <p>{verse.citation}</p>
            </Link>
          </div>
          <button onClick={(e) => this.props.deleteVerse(verse)}>Delete</button>
        </div>
      cards.push(card)
    })
    return cards
  }

  render(){
    return(
      <div>
        {this.props.verses.length ?
          this.createVerseCards(this.props.verses)
          :
          <p>No verses!</p>
        }

      </div>
    )
  }
}

export default verseCards;
