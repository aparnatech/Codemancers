import axios from 'axios'
export function gifList() {
    return (dispatch) => {
        try {
            axios.get(`https://api.giphy.com/v1/stickers/trending?api_key=${process.env.REACT_APP_GIPHY_KEY}`).then((response) => {
                const payload = response.data.data
                dispatch({ type: 'GIF_LIST', payload })
            })
        } catch (err) {
            console.log(err)
        }
    };
}
export function searchGifList(inputText) {
    return (dispatch) => {
        try {
            axios.get(`https://api.giphy.com/v1/stickers/search?api_key=${process.env.REACT_APP_GIPHY_KEY}&q=${inputText}&limit=25&offset=0&rating=g&lang=en`).then((response) => {
                const payload = response.data.data
                dispatch({ type: 'SEARCH_GIF', payload })
            })
        } catch (err) {
            console.log(err)
        }
    };
}
