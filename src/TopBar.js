import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import SignBar from './SignBar.js'

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class TopBar extends Component {

  render(){
    const { classes } = this.props
    const { userSession,handleSignIn} = this.props;
    return(
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              留言板
            </Typography>
            {userSession.isUserSignedIn() ?
            <SignBar userSession={this.props.userSession} handleSignIn={ this.props.handleSignIn } handleSignOut={ this.props.handleSignOut }/>
            : <Button onClick={handleSignIn.bind(this)} > 登入 </Button>
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(useStyles)(TopBar)
