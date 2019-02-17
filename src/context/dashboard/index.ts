import React, { createContext, Reducer, Dispatch } from 'react'

// Types:
type State = {
  dragging: boolean
  full: boolean
  open: boolean
  layout: any
}

type Ctx = {
  state?: State
  dispatch?: Dispatch<any>
}

// Context:
export const DashboardContext = createContext<Ctx>({})

// Init state:
export const initialState: State = {
  dragging: false,
  full: false,
  layout: [
    { i: 'a', x: 0, y: 0, w: 1, h: 1 },
    { i: 'b', x: 1, y: 0, w: 1, h: 1 },
    { i: 'c', x: 0, y: 1, w: 1, h: 1 },
    { i: 'd', x: 1, y: 1, w: 1, h: 1 }
  ],
  open: false
}

// Reducer
export const reducer: Reducer<State, any> = (state: any, { type, payload }: any) => {
  switch (type) {
    case 'DRAGGING':
      return { ...state, dragging: !state.dragging }
    case 'TOGGLE_NAV':
      return { ...state, open: !state.open }
    case 'TOGGLE_FULL_SCREEN':
      return { ...state, full: !state.full }
    case 'UPDATE_LAYOUT':
      return { ...state, layout: payload.layout }
    default:
      return state
  }
}
