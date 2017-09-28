import { POST_VERSE, FIND_VERSE, FETCH_VERSE, DELETE_VERSE } from '../actions/types'
const he = require("he");


const initialVerseState = {
  selectedVerse: {},
  error: null
}

function setVerse(v){
  let verse = v[0].verse
  let citation = v[0].bookname + " " + v[0].chapter + ":" + verse
  let text = v[0].text
  if(v.length > 1){
    verse = verse + "-" + v[v.length - 1].verse
    citation = citation + "-" + v[v.length - 1].verse
    for(var i = 1; i < v.length; i++){
      text = text + " " + v[i].text
    }
  }
  let newVerse = {
    bookname: v[0].bookname,
    chapter: v[0].chapter,
    text: he.decode(text),
    verse: verse,
    citation: citation
  }
  return {newVerse, error: null}
}

export default function (state = initialVerseState, action) {
  console.log("action- ", action)
  switch(action.type) {
    case POST_VERSE:
      return action.payload || false;
    case FIND_VERSE:
      let verse;
      if(action.payload.length > 0){
        verse = Object.assign({}, state, setVerse(action.payload));
        return verse;
      } else {
        verse = Object.assign({}, state, {error: "Sorry, we couldn't find what you were looking for!"})
      }
      return verse
    case FETCH_VERSE:
      if(!action.error){
        let verse = Object.assign({}, state, {selectedVerse: action.payload});
        return verse;
      }
      return state
    case DELETE_VERSE:
      return state;
    default:
      return state;
  }
}
