import React from "react";
import PropTypes from "prop-types";

// Set up global contexts
export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

// Actions
export const LANG = "set_lang";

// Reducer
export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LANG: {
      return {
        ...state,
        lang: payload
      };
    }
    // Add more here!
    default:
      return state;
  }
};

function GlobalState(props) {
  const { initialState, dispatch } = props;
  return (
    <GlobalStateContext.Provider value={initialState}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {props.children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}

GlobalState.propTypes = {
  initialState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default GlobalState;