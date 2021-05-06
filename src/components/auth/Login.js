import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../redux/store";
import { signIn } from "../../redux/actions/signIn";
import { resetPassword } from "../../redux/actions/resetPassword";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: "",
      isLoggedIn: null,
      sentPasswordResetEmail: null,
    };

    store.subscribe(() => {
      this.setState({
        sentPasswordResetEmail: store.getState().auth.sentResetMail,
      });
    });

    store.subscribe(() => {
      this.setState({
        isLoggedIn: store.getState().auth.isLoggedIn,
      });
    });
  }

  handleUserIdChange = (e) => {
    console.log(this.state.userId);
    this.setState({ userId: e.target.value });
  };

  handlePasswordChange = (e) => {
    console.log(this.state.password);
    this.setState({ password: e.target.value });
  };

  requestSignIn = (e) => {
    e.preventDefault();
    const userId = this.state.userId;
    const password = this.state.password;
    const cred = userId + " " + password;
    console.log("cred = ", cred);
    if (userId.length === 0 || password.length === 0) {
      this.setState({ isLoggedIn: false });
      // this.setState({ isLoggedIn: true });
    } else {
      const credentials = { userId, password };
      this.props.signIn(credentials);
      this.setState({ isLoggedIn: this.props.isLoggedIn });
      console.log("class state isLoggedIn: ", this.state.isLoggedIn);
    }
  };

  requestPasswordReset = (e) => {
    e.preventDefault();
    const userId = this.state.userId;
    if (userId.length === 0) {
      this.setState({ sentPasswordResetEmail: false });
    } else {
      const credentials = { email: userId };
      console.log(credentials.email);
      this.props.resetPassword(credentials);
    }
  };

  loginSuccessAlert() {
    return (
      <div
        className="alert alert-success"
        role="alert"
        style={{
          marginTop: "10px",
        }}
      >
        Login successful!
      </div>
    );
  }

  loginFailedAlert() {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{
          marginTop: "10px",
        }}
      >
        Login failed!
      </div>
    );
  }

  resetPasswordSuccessAlert() {
    return (
      <div
        className="alert alert-success"
        role="alert"
        style={{
          marginTop: "10px",
        }}
      >
        Password reset email sent successfully, please check your email!
      </div>
    );
  }

  resetPasswordFailedAlert() {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{
          marginTop: "10px",
        }}
      >
        Failed to send reset password mail, please enter correct email and check
        your internet connectivity!
      </div>
    );
  }

  render() {
    return (
      <>
        <div
          className="auth-body"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="auth-container">
            <form>
              <h3>Login</h3>
              <div className="form-group">
                <label>User Id</label>
                <input
                  onChange={this.handleUserIdChange}
                  type="text"
                  className="form-control"
                  placeholder="User Id"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  onChange={this.handlePasswordChange}
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
              <button
                onClick={this.requestPasswordReset}
                type="button"
                className="btn btn-link btn-sm"
              >
                Forgot password?
              </button>
              <button
                onClick={this.requestSignIn}
                type="submit"
                className="btn btn-primary btn-block"
                style={{
                  marginTop: "10px",
                }}
              >
                Submit
              </button>
              {/* {this.showAlertDiv()} */}
              {this.state.sentPasswordResetEmail === true
                ? this.resetPasswordSuccessAlert()
                : null}
              {this.state.sentPasswordResetEmail === false
                ? this.resetPasswordFailedAlert()
                : null}
              {this.state.isLoggedIn === true ? this.loginSuccessAlert() : null}
              {this.state.isLoggedIn === false ? this.loginFailedAlert() : null}
              {this.state.isLoggedIn === true
                ? this.props.history.push("/dashboard")
                : null}
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials)),
    resetPassword: (credentials) => dispatch(resetPassword(credentials)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
