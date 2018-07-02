import * as config from '../common/config'
import * as actionTypes from '../actions/actionTypes'
import fetch from 'isomorphic-fetch'
const { messageTypes } = config

export function startUp() {
  // this is the redux-middleware package in action, dispatch and getState params are passed in
  return (dispatch, getState, { emit }) => {
    emit(messageTypes.usersRequested)
  }
}

export function updateMask(room, mask) {
  return (dispatch, getState, { emit }) => {
    emit(messageTypes.updateMask, { 'mask': mask, 'room': room })
  }
}

export function setRole(role) {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.SET_ROLE, payload: role })
  }
}

export function addRoom(room) {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.ADD_ROOM, payload: room })
  }
}

export function getContent(room) {
  return (dispatch) => {
    return fetch(`content?room=${room}`)
      .then(response => response.json())
      .then(json => { dispatch({ type: actionTypes.GET_CONTENT, payload: json }) })
  }
}

export function getMask(room, role) {
  return (dispatch => {
    return fetch(`mask?room=${room}&role=${role}`)
      .then(response => response.json())
      .then(json => { dispatch({ type: actionTypes.GET_MASK, payload: json }) })
  })
}

export function saveResource(data) {
  return (dispatch => {
    return fetch('data', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: data })
    })
  })
}

export function reloadContent(room) {
  return (dispatch, getState, { emit }) => {
    emit(messageTypes.reloadContent, { 'content': '', 'room': room })
  }
}

export function resetMask(room) {
  return (dispatch, getState, { emit }) => {
    emit(messageTypes.resetMask, { 'room': room })
  }
}

export function enterRoom(room, role, team) {
  return (dispatch, getState, { emit }) => {
    emit(messageTypes.enterRoom, { 'room': room, 'role': role, 'team': team })
  }
}

export function joinRequested() {
  return (dispatch, getState, { emit }) => {
    emit(messageTypes.joinRequested)
  }
}

export function teamOnChange(team) {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.CHANGE_TEAM, payload: team })
  }
}

export function clickWrongBox(room,team){
  return (dispatch, getState, { emit }) => {
    emit(messageTypes.clickWrongBox, { 'room': room, 'team': team })
  }
}
