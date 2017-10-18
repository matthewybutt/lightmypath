import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class MemorizeVerse extends Component {
  constructor(props){
    super(props);
    this.state={
      verseText: "",
      verseCitation: "",
      memorizeArray: [],
      wordsToOmit: [],
      verseSet: false,
      attempts: 1,
      maxAttempts: 1,
      answerKey: {},
      userGuess: {},
      answerSubmitted: false,
      answerCorrect: false,
      answerResponse: null,
    }

    this.setMemoryVerse = this.setMemoryVerse.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.keepPlaying = this.keepPlaying.bind(this);
  }

  componentDidMount(){
    if(this.props.verse.selectedVerse.attempts > 1){
      this.setState({attempts: this.props.verse.selectedVerse.attempts})
    }
    if(this.props.verse.selectedVerse.maxAttempts > 1){
      this.setState({maxAttempts: this.props.verse.selectedVerse.maxAttempts})
    }
  }

  handleChange(e){
    let userGuess = {};
    let answerKey = {};
    if(!userGuess[e.target.id]){
      userGuess[e.target.id] = (e.target.value).toLowerCase()
    } else {
      userGuess[e.target.id] = (e.target.value).toLowerCase()
    }
    if(!answerKey[e.target.id]){
      answerKey[e.target.id] = ((this.state.memorizeArray[e.target.id]).replace(/[^A-Za-z0-9_]/g,"")).toLowerCase();
    } else {
      answerKey[e.target.id] = ((this.state.memorizeArray[e.target.id]).replace(/[^A-Za-z0-9_]/g,"")).toLowerCase();
    }
    this.setState({userGuess: userGuess});
    this.setState({answerKey: answerKey});

  }

  setMemoryVerse(){
    let text = this.props.verse.selectedVerse.text;
    let citation = this.props.verse.selectedVerse.citation;
    let memorizeArray = text.split(" ")
    let randomWordArray = this.randomWordArray(memorizeArray)
    this.setState({
      verseText: text,
      verseCitation: citation,
      memorizeArray: memorizeArray,
      verseSet: true,
      wordsToOmit: randomWordArray,
      answerCorrect: false,
      answerSubmitted: false
    })
  }

  randomWordArray(memorizeArray){
    let numberOfWordsToRandomize = this.state.attempts;
    let numberOfWordsTotal = memorizeArray.length;
    let keyObj = {}
    let wordsToOmitArray = [];
    for(var i = 1; i <= numberOfWordsToRandomize; i++){
      let nextNumber = this.randomNumber(numberOfWordsTotal)
      if(!keyObj[nextNumber]){
        keyObj[nextNumber] = 1
        wordsToOmitArray.push(nextNumber)
      }
    }
    return wordsToOmitArray
    // this.setState({wordsToOmit: wordsToOmitArray})
  }

  randomNumber(numberOfWordsTotal){
    let number = Math.floor(Math.random() * numberOfWordsTotal)
    return number
  }

  memorizeVerse(){
    let fields = [];
    for(var i = 0; i < this.state.memorizeArray.length; i++){
      if(this.state.wordsToOmit.indexOf(i) < 0){
        let word = this.state.memorizeArray[i] + " ";
        fields.push(<span key={i} id={i}>{word}</span>);
      } else {
        let wordWidth = ((this.state.memorizeArray[i].length) * 10) + "px";
        let inputStyle = {
          width: wordWidth,
          textAlign: "center",
          margin: "0 0 5px"
        };
        fields.push(<span key={i} style={{padding: "0 5px"}}><input id={i} type="text" ref="guessInput" placeholder="?" style={inputStyle} onChange={this.handleChange}/></span>)
      }
    }
    return fields
  }

  submitAnswer(e){
    e.preventDefault();
    if(Object.keys(this.state.userGuess).length > 0){
      this.setState({answerSubmitted: true})
      for(var i in this.state.answerKey){
        if(this.state.answerKey[i] === this.state.userGuess[i]){
          this.setState({
            answerResponse: "Correct!",
            answerCorrect: true,
            attempts: this.state.attempts + 1
          })

        } else {
          this.setState({
            answerResponse: "Try Again!",
            answerCorrect: false
          })
          if(this.state.attempts > 1){
            this.setState({
              attempts: this.state.attempts - 1
            })
          }
        }
      }
    }
    //add PATCH verse call here to update attempts in DB
  }

  keepPlaying(){
    document.getElementById("memory-verse-form").reset();
    this.setState({
      verseText: "",
      verseCitation: "",
      memorizeArray: [],
      wordsToOmit: [],
      verseSet: false,
      answerKey: {},
      userGuess: {},
      answerSubmitted: false,
      answerResponse: null,
    })
    this.setMemoryVerse();
  }

  render() {
    // console.log(this.props)
    // console.log(this.state)
    return(
      <div className="row" style={{padding:"25px"}}>
      {Object.keys(this.props.verse.selectedVerse).length > 0?
        <div>
          <h3>Memorize Verse</h3>
          <div className="card">
            <div className="card-content">
              <p className="card-title">{this.props.verse.selectedVerse.citation}</p>
                {!this.state.verseSet ?
                  <div>
                    <p>{this.props.verse.selectedVerse.text}</p>
                  </div>
                  :
                  <form id="memory-verse-form" onSubmit={this.handleSubmit}>
                    <div>
                      {this.memorizeVerse()}
                    </div>
                  </form>
                }
            </div>
            <div className="card-action" style={{textAlign: "center"}}>
              {!this.state.verseSet ?
                <button className="btn waves-effect waves-light blue darken-1" onClick={this.setMemoryVerse}>Memorize Verse</button>
                :
                <div>
                {!this.state.answerSubmitted ?
                  <button className="btn waves-effect waves-light blue darken-1" onClick={this.submitAnswer}>Submit Answer</button>
                  :
                  <div>
                    {this.state.answerCorrect ?
                    <div>
                      <h5 style={{color:"green", fontWeight:"bold", marginTop:"0"}}>{this.state.answerResponse}</h5>
                      <p>Keep Memorizing This Verse?</p>
                      <button className="btn waves-effect waves-light blue darken-1" onClick={this.keepPlaying}>Yes</button>
                    </div>
                    :
                    <div>
                      <h5 style={{color:"red", fontStyle:"italic", fontWeight:"bold", marginTop:"0"}}>{this.state.answerResponse}</h5>
                      <button className="btn waves-effect waves-light blue darken-1" onClick={this.submitAnswer}>Submit Answer</button>
                    </div>
                  }
                  </div>
                }
              </div>
              }
            </div>
          </div>
        </div>
        :
        <div style={{textAlign:"center"}}>
          <h5>Please select a verse from your saved verses!</h5>
          <Link to={"/verse/my_verses"}><button className="btn waves-effect waves-light red darken-4">My Verses</button></Link>
        </div>
      }
      </div>
    )
  }
}

function mapStateToProps(props) {
  return props
}

export default connect(mapStateToProps, actions)(MemorizeVerse)
