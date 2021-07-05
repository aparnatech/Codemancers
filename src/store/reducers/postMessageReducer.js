export default function postMessageList(state = { postMessages: [] }, action) {
    switch (action.type) {
        case 'POST_MESSAGES':
            return {
                ...state,
                postMessages: [...state.postMessages, ...action.payload]
            }
        case 'REMOVE_POST_MESSAGES':
            return {
                ...state,
                postMessages: state.postMessages.filter(x => x.id !== action.payload)
            }
        default:
            return state
    }
}