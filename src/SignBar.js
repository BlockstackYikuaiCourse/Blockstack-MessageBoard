import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {
  Person,
} from 'blockstack';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';



export default class SignBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return avatarFallbackImage;
        },
      },
      anchorElState : null
    }
  }

  handleMenu (e){
    this.setState({
      anchorElState : e.currentTarget
    })
  };

  handleClose ()  {
    console.log("in handleClose",this.state.person)
    this.setState({
      anchorElState : null
    })
  };

  render() {
    const { handleSignIn,userSession,handleSignOut } = this.props;
    const { person } = this.state;
    return (
      <div>
        {!userSession.isSignInPending() ?
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={e => this.handleMenu(e)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorElState}
              keepMounted
              open={Boolean(this.state.anchorElState)}
              onClose={e => this.handleClose()}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              getContentAnchorEl={null}
            >
              <MenuItem onClick={e => this.handleClose()}><div>用户名称：{person.name()}</div></MenuItem>
              <MenuItem onClick={e => this.handleClose()}><div>用户简介：{person.description()}</div></MenuItem>
              <MenuItem onClick={handleSignOut.bind(this)}>登出</MenuItem>
            </Menu>
          </div>
          : null

        }
      </div>
    );
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });
  }
}
