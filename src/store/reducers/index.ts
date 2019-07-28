import { combineReducers } from 'redux'
import {
  droppingDecksReducer,
  tmpDecksReducer,
  finishDecksReducer,
} from './cards'
import { AppState } from '../types'
import { undoableReducerEnhancer }  from '../reducers/enhancers/undoable'

const rootReducer = combineReducers<AppState>({
  droppingDecks: droppingDecksReducer,
  tmpDecks: tmpDecksReducer,
  finishDecks: finishDecksReducer,
})

export default undoableReducerEnhancer(rootReducer)
