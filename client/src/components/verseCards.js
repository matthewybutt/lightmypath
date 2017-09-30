import React, { Component } from "react";
import { Link } from 'react-router-dom';


class verseCards extends Component {

  createVerseCards(verses){
    let cards = []
    let cardStyle = {
      border: "1px solid black",
      margin: "5px",
      padding: "15px",
      width: "30%",
      borderRadius: "15px",
      display: "inline-block",
      verticalAlign: "top",
    }
    verses.forEach((verse, i) => {
      let card = <div key={i} style={cardStyle} onClick={(e) => this.props.selectVerse(verse)}>
          <Link to={"/memorize"} style={{color: "black"}}>
            <p>{verse.text}</p>
            <p style={{textAlign: "right"}}>-{verse.citation}</p>
          </Link>
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
