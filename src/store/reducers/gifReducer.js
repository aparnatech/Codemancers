export default function gifList(state = { allGifs: [], searchGifs: [] }, action) {
    switch (action.type) {
        case 'GIF_LIST':
            return {
                ...state,
                allGifs: action.payload
            }
        case 'SEARCH_GIF':
            return {
                ...state,
                allGifs: action.payload
            }
        default:
            return state
    }
}