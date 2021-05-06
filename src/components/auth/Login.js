import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/signIn";
// import { NavLink } from "react-router-dom";
// import Dashboard from "../dashboard/Dashboard";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: "",
      isLoggedIn: null
    };
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
    const credentials = { userId, password };
    this.props.signIn(credentials);
    this.setState({isLoggedIn: this.props.isLoggedIn})
    console.log("class state isLoggedIn: ", this.state.isLoggedIn)
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

  showAlertDiv() {
    switch (this.state.isLoggedIn) {
      case true:
        return this.loginSuccessAlert();
      case false:
        return this.loginFailedAlert();
      default:
        return null;
    }
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
                onClick={this.requestSignIn}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Submit
              </button>
              {this.showAlertDiv()}
              {(this.state.isLoggedIn === true) ? this.props.history.push("/dashboard"): null}
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
