import { createStore,combineReducers } from "redux";
import dashboardReducer from "./containers/Dashboard/redux/reducer"
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    dashBoard:dashboardReducer
})

const store = createStore(rootReducer,composeWithDevTools());

export default store;