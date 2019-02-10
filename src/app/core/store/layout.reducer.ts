import {
    LayoutActionTypes,
    LayoutActionsUnion,
  } from './layout.actions';
  
  export interface State {
    showSidenav: boolean;
  }
  
  const initialState: State = {
    showSidenav: true,
  };
  
  export function reducer(
    state: State = initialState,
    action: LayoutActionsUnion
  ): State {
    switch (action.type) {
      case LayoutActionTypes.ToggleSidenav:
        return {
          showSidenav: !state.showSidenav,
        };
      default:
        return state;
    }
  }
  
  export const getShowSidenav = (state: State) => state.showSidenav;
  