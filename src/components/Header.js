import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Toolbar,
    AppBar
} from '@material-ui/core';
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        marginBottom: '2rem'
    },
    title: {
        flexGrow: 1,
    },
}));
const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Codemancers
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
