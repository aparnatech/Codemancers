import { combineReducers } from 'redux';
import postMessageList from './postMessageReducer'
import gifReducerList from './gifReducer'

export const rootReducer = combineReducers({
    postMessages: postMessageList,
    gifList: gifReducerList
});
export default rootReducer;