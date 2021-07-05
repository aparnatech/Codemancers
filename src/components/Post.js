import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { deletepostMessage } from '../store/action/postAction'
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
}));
const Post = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { postMessages } = useSelector(state => state.postMessages)
    const deletePost = (id) => {
        dispatch(deletepostMessage(id))
    }
    console.log(postMessages)
    return (
        <Grid container item xs={12} md={12} justify="center" style={{ marginTop: '2rem' }}>
            <Grid item xs={12} sm={12} md={6} className={classes.displayText}>
                <Grid item xs={12} sm={12} md={12} >           {postMessages.map((item) => {

                    return (
                        <Card className={classes.root} key={item.id} style={{ margin: '1rem 2rem' }}>
                            <CardHeader
                                style={{ borderBottom: '1px solid #dfdfdf' }}
                                avatar={
                                    <img src={(item.selectedGif && item.selectedGif.user) ? item.selectedGif.user.avatar_url : '/assests/person.png'} alt="dummy" className={classes.imgIcon} />
                                }
                                action={
                                    <i className="material-icons" style={{ fontSize: 30, color: '#0f4c81', cursor: 'pointer' }} onClick={() => deletePost(item.id)}>delete_outline</i>
                                }
                                title={(item.selectedGif && item.selectedGif.user) ? item.selectedGif.user.username : "Janet"}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.text}
                                </Typography>
                                {item.selectedGif && <img src={item.selectedGif.images.downsized.url} alt="gif" height='145' width='145' />}
                            </CardContent>
                        </ Card>
                    )
                })}
                </Grid></Grid>
        </Grid>
    )
}

export default Post
