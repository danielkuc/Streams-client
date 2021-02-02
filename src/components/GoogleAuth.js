import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '250697443279-u887cm2h0fh318i1ddjnngg3f5ermtch.apps.googleusercontent.com',
        scope:'email'
        // scope of google auth
      })
      // returns promise, can use .then and callback.
      .then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  // helper functions
  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };
  // / helper functions

  renderAuthButton() {
    if(this.props.isSignedIn === null) {
      return null;
    } else if(this.props.isSignedIn) {
      return (
          <button onClick={this.onSignOutClick} className="ui red google button">
            <i className="google icon"></i>
            Sign Out
          </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"></i>
          Sign In with Google
        </button>
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderAuthButton()}      
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);