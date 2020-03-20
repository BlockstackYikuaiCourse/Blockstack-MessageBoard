import React, { Component } from 'react';
import Message from './Message.js';
import SigninCover from './SigninCover.js';
import TopBar from './TopBar.js'
import {
  UserSession,
  AppConfig
} from 'blockstack';


const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig: appConfig })



class App extends Component {

  constructor(){
    super()
    console.log(appConfig)
    console.log(userSession)
  }

  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    const { classes } = this.props;
    return (

      <div className="site-wrapper">
        <TopBar userSession={userSession} handleSignIn={ this.handleSignIn } handleSignOut={ this.handleSignOut }/>
        <div className="site-wrapper-inner">
          { !userSession.isUserSignedIn() ?
            <SigninCover userSession={userSession}/>
            : <Message userSession={userSession} handleSignOut={ this.handleSignOut } />
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
      });
    }
  }
}

export default App;
