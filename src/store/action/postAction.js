export function postMessage(payload) {
    console.log(payload)
    return (dispatch) => {
        dispatch({ type: 'POST_MESSAGES', payload })
    }
};
export const deletepostMessage = (id) => {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_POST_MESSAGES',
            payload: id
        })
    }
}