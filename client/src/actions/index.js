import axios from 'axios';

import { FETCH_USER, POST_VERSE, FIND_VERSE, FETCH_VERSE, DELETE_VERSE } from './types'

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  };

export const fetchVerse = (verse) => async dispatch => {
    // const res = await axios.get('/api/selected_verse');
    dispatch({ type: FETCH_VERSE, payload: verse });
  };

export const postVerse = (verse) => async dispatch => {
  console.log("posting verse...")
    const res = await axios.post('/api/post_verse', verse);
    dispatch({ type: POST_VERSE, payload: res.data });
  };

export const findVerse = (verse) => async dispatch => {
  console.log("finding verse...")
    const res = await axios.post('/api/find_verse', verse);
    dispatch({ type: FIND_VERSE, payload: res.data });
  };

export const deleteVerse = (verseId) => async dispatch => {
  console.log("deleting verse...")
    const res = await axios.patch('/api/delete_verse', verseId);
    dispatch({ type: DELETE_VERSE, payload: res.data });
  };

