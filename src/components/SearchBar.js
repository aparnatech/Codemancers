import React, { useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Menu } from '@material-ui/core';
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { postMessage } from '../store/action/postAction'
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post';
import { gifList, searchGifList } from '../store/action/gifApiFetch';
const useStyles = makeStyles(() => ({
    imgIcon: {
        display: 'inline',
        borderRadius: '50%',
        marginRight: '0.2rem',
        width: '50px'
    },
    displayText: {
        display: 'flex',
    },
    gifBtn: {
        marginLeft: '0.5rem',
        height: '50px'
    }
}));
const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
        width: '300px',
        height: '400px'
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));
const SearchBar = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    // const inputText = useRef()
    const { postMessages } = useSelector(state => state.postMessages)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [text, setText] = useState('')
    const [err, setErr] = useState(false)
    const [inputText, setinputText] = useState('')
    const [selectedGif, setSelectedGif] = useState(null)
    const handleInput = (e) => {
        setinputText(e.target.value)
        inputText.length === 0 && setSelectedGif(null)
    }
    useEffect(() => {
        dispatch(gifList())
    }, [dispatch])
    const { allGifs } = useSelector(state => state.gifList)

    const handleSubmit = () => {
        if (inputText.length === 0) {
            //set error state to true
            setErr(true)
            return
        }
        dispatch(searchGifList(inputText))
        setinputText('')
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        dispatch(gifList())
    };
    const showPreviewGif = (item) => {
        setSelectedGif(item)
    }
    const postMessageHandler = () => {
        const obj = {
            id: uuid(),
            text,
            selectedGif
        }
        dispatch(postMessage([obj]))
        setSelectedGif(null)
        setText('')
    }
    return (
        <Grid container  >
            <Grid container item xs={12} md={12} justify="center" >
                <Grid item xs={12} sm={12} md={6} className={classes.displayText}>
                    <Grid item xs={2} sm={1} md={2} lg={1} className={classes.displayText}><img src="/assests/person.png" alt="dummy" className={classes.imgIcon} /></Grid>
                    <Grid item xs={5} sm={12} md={8} className={classes.displayText}>
                        <input type="text" value={text} style={{ width: '100%' }} className="advancedSearchTextBox" placeholder="Enter message..." onChange={(e) => setText(e.target.value)} />
                    </Grid>
                    <Button variant="contained" color="primary" disabled={text.length === 0 && selectedGif === null} onClick={() => postMessageHandler()}>
                        Post
                    </Button>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                            className={classes.gifBtn}
                        >
                            Gif
                        </Button>
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <input type="text" value={inputText} style={{ width: '62%', height: '33px' }} className="advancedSearchTextBox" onChange={(e) => handleInput(e)} />

                            <Button
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                variant="contained"
                                color="primary"
                                disabled={inputText.length === 0}
                                onClick={handleSubmit}
                            >
                                show gif
                            </Button>
                            {err && <span>Something went wrong! please check the Network</span>}
                            <div>
                                {allGifs.length > 0 && allGifs.map((item) => {
                                    return (
                                        <span key={item.id} onClick={() => showPreviewGif(item)}>
                                            <img src={item.images.downsized.url} alt="gif" height='145' width='145' />
                                        </span>
                                    )
                                })}
                                {allGifs.length === 0 && <span>Not Found!</span>}
                            </div>
                        </StyledMenu>
                    </div>

                </Grid>
            </Grid>
            {selectedGif && <Grid container item xs={12} md={12} justify="center" style={{ padding: '2rem' }}>
                <Grid item xs={6} sm={3} md={6} className={classes.displayText}>
                    <Grid item md={6}>  {selectedGif && <img src={selectedGif.images.downsized.url} alt="gif" height='145' width='145' />}</Grid></Grid></Grid>}

            {postMessages.length > 0 && <Post />}
        </Grid>
    )
}

export default SearchBar