import * as loadingSpinner from "./loader.action";

export interface State {
    active: number;
    actionsInProgress: any[];
}
const initialState: State = {
    active: 0,
    actionsInProgress: []
};

export function reducer(state = initialState, action: any): State {
    debugger;
    //   switch (action.type) { 
    //     case loadingSpinner.SHOW_SPINNER: {
    //       const isActionAlreadyInProgress = state.actionsInProgress.filter(
    //         (currentAction: any) => currentAction === action.payload.type
    //       ).length;

    //       // If the action in already in progress and is registered
    //       // we don't modify the state
    //       if (isActionAlreadyInProgress) {
    //         return state;
    //       }
    //       // Adding the action type in our actionsInProgress array
    //       const newActionsInProgress = [
    //         ...state.actionsInProgress,
    //         action.payload.type  
    //       ];

    //       return Object.assign(state, {
    //         active: newActionsInProgress.length,
    //         actionsInProgress: newActionsInProgress
    //       });
    //     }
    //     case loadingSpinner.HIDE_SPINNER: {
    //       // We remove trigger action from actionsInProgress array
    //       const newActionsInProgress = action.payload.triggerAction
    //         ? state.actionsInProgress.filter(
    //             (currentAction: any) =>
    //               currentAction !== action.payload.triggerAction
    //           )
    //         : state.actionsInProgress;

    //       return Object.assign(state, {
    //         actionsInProgress: newActionsInProgress,
    //         active: state.active > 0 ? newActionsInProgress.length : 0
    //       });
    //     }
    //     default:
    //       return state;
    //   }
    if (action.showLoader) {
        const isActionAlreadyInProgress = state.actionsInProgress.filter(
            (currentAction: any) => currentAction === action.type
        ).length;

        // If the action in already in progress and is registered
        // we don't modify the state
        if (isActionAlreadyInProgress) {
            return state;
        }
        // Adding the action type in our actionsInProgress array
        const newActionsInProgress = [
            ...state.actionsInProgress,
            action.type
        ];

        return {
            active: newActionsInProgress.length,
            actionsInProgress: newActionsInProgress
        };
    } else if (action.triggerAction) {

        // We remove trigger action from actionsInProgress array
        const newActionsInProgress = action.triggerAction
            ? state.actionsInProgress.filter(
                (currentAction: any) =>
                    currentAction !== action.triggerAction
            )
            : state.actionsInProgress;

        return {
            active: state.active > 0 ? newActionsInProgress.length : 0,
            actionsInProgress: newActionsInProgress
        };
    } else {
        return state;
    }
}

export const isLoadingSpinnerActive = (state: State) => state.active;
