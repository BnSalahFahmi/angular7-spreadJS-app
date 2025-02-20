import * as layout from './layout.actions';


export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: true,
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.CLOSE_SIDENAV:
      return {
        showSidenav: false
      };

    case layout.OPEN_SIDENAV:
      return {
        showSidenav: true
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;