const initialState = {};

export type InitialStateType = typeof initialState;

const sidebarReducer = (state = initialState): InitialStateType => state;

export default sidebarReducer;
