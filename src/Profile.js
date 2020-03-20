import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {
  Person,
} from 'blockstack';

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return avatarFallbackImage;
        },
      },
    }
  }
  render() {
    const {userSession,handleSignOut} = this.props;
    const { person } = this.state;
    console.log(this.props)
    return (
      <div>
        <Button onClick={handleSignOut.bind(this)} > 登出 </Button>
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
