// Action names:
export const DRAGGING = 'DRAGGING'
export const TOGGLE_FULL_SCREEN = 'TOGGLE_FULL_SCREEN'
export const TOGGLE_NAV = 'TOGGLE_NAV'
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT'

// Action creator:
export const dragging = () => ({ type: DRAGGING })
export const toggleFullScreen = () => ({ type: TOGGLE_FULL_SCREEN })
export const toggleNav = () => ({ type: TOGGLE_NAV })
export const updateLayout = (layout: any) => ({type: UPDATE_LAYOUT, payload: {layout}})
