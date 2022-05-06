import { combineReducers } from "redux";
import currentIdReducer from "./currentIdReducer.js";
import subtitleReducer from "./subtitleReducer.js";
import vanishReducer from "./vanishReducer";

const rootReducer = combineReducers({
    vanish: vanishReducer,
    currentId: currentIdReducer,
    subtitle: subtitleReducer
});

export default rootReducer;