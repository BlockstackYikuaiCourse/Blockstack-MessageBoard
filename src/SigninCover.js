import React, { Component } from 'react';

export default class SigninCover extends Component {
  constructor(props) {
  	super(props);
  }
  render() {
    const { handleSignIn } = this.props;

    return (
      <div >
        <h1>欢迎来到留言板</h1>
      </div>
    );
  }
}
