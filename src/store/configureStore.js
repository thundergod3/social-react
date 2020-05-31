import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddle from "redux-saga";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddle();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const useReduxLogger = true;

let listMiddleWare = [sagaMiddleware];

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
