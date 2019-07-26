import _cloneDeep from 'lodash.clonedeep'

export type HoldingState<T> = {
  past: T[]
  present: T
  future: T[]
}

export function undoableReducerEnhancer<T> (reducer: (...any) => T){

 const initialState: HoldingState<T> = {
    past: [],
    present: reducer(undefined, {}),
    future: []
  }

  return function(state = initialState, action): HoldingState<T> {
    const { past, present, future } = state
console.log('present', present)
    switch (action.type) {
      case 'UNDO':
        console.log('past.length - 1', past.length - 1)
        const previous = past[past.length - 1]
        const newPast = past.slice(0, past.length - 1)
        
        const newState = {
          past: newPast,
          present: previous,
          future: [present, ...future]
        }
        console.log('newState', newState)
        return newState
      case 'REDO':
        const next = future[0]
        const newFuture = future.slice(1)
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        }
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action)
        if (present === newPresent) {
          console.log('1111111111')
          return state
        }
        const newNoChangePast = _cloneDeep(past)
        newNoChangePast.push(present)
        return {
          past: newNoChangePast,
          present: newPresent,
          future: []
        }
    }
  }
}
