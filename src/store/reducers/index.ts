import { combineReducers } from 'redux'
import {
  undoable_droppingDecksReducer,
  undoable_tmpDecksReducer,
  undoable_finishDecksReducer,
} from './cards'
import { AppState } from '../types'

const rootReducer = combineReducers<AppState>({
  droppingDecks: undoable_droppingDecksReducer,
  tmpDecks: undoable_tmpDecksReducer,
  finishDecks: undoable_finishDecksReducer,
})

export default rootReducer
