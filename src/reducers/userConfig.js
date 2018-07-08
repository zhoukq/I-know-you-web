import * as actionTypes from '../actions/actionTypes'
import { messageTypes, DIRECTOR, PLAYER, playerMask, directorMask } from '../common/config'
import Immutable, { List } from 'immutable'

const userConfig = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_ROLE:
            return action.payload === DIRECTOR ? {
                ...state,
                role: action.payload,
                mask: Immutable.fromJS(directorMask),
            } : {
                    ...state,
                    role: action.payload,
                    mask: Immutable.fromJS(playerMask),
                }
            break
        case messageTypes.updateMask:
            if (action.payload.room == state.room) {
                return {
                    ...state,
                    mask: Immutable.fromJS(action.payload.mask),
                }
            }
            break
        case actionTypes.ADD_ROOM:
            return {
                ...state,
                room: action.payload
            }
            break
        case actionTypes.GET_MASK:
            return {
                ...state,
                mask: Immutable.fromJS(action.payload.mask),
            }
            break
        case messageTypes.resetMask:
            if (action.payload.room == state.room) {
                return {
                    ...state,
                    mask: Immutable.fromJS(action.payload.mask),
                    operable: true
                }
            }
        case actionTypes.GET_CONTENT:
            if (action.payload.room == state.room) {
                return {
                    ...state,
                    content: action.payload.content,
                    operable: true
                }
            }
            break
        case messageTypes.reloadContent:
            if (action.payload.room == state.room) {
                return {
                    ...state,
                    content: action.payload.content
                }
            }
            break
        case messageTypes.joinRequested:
            if (action.payload.joined && !state.joined) {
                return {
                    ...state,
                    role: action.payload.role,
                    mask: Immutable.fromJS(action.payload.mask),
                    room: action.payload.room,
                    team: action.payload.team,
                    content: action.payload.content,
                    joined: true,
                    operable: action.payload.operable
                }
            }
            break
        case actionTypes.CHANGE_TEAM:
            return {
                ...state,
                team: action.payload
            }
            break
        case messageTypes.clickWrongBox:
            if (action.payload.room == state.room) {
                if (action.payload.team == state.team) {
                    return {
                        ...state,
                        operable: false
                    }
                } else {
                    return {
                        ...state,
                        operable: true
                    }
                }
            }
            break
    }

    return state
}


export {
    userConfig
}