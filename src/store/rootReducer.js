import { combineReducers } from "redux";
import blogReducer from "./redux/reducers/blogReducer";
import authReducer from "./redux/reducers/authReducer";

const rootReducer = combineReducers({
	blogReducer,
	authReducer,
});

export default rootReducer;
