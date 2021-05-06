import React, { Component } from "react";
import { register } from "../../redux/actions/register";
import store from "../../redux/store";
import { connect } from "react-redux";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      sentRegReqSuccessfully: null,
    };

    store.subscribe(() => {
      this.setState({
        sentRegReqSuccessfully: store.getState().auth.sentRegisterRequest,
      });
    });
  }

  handleFirstNameChange = (e) => {
    this.setState({ firstName: e.target.value });
  };

  handleLastNameChange = (e) => {
    this.setState({ lastName: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePhoneChange = (e) => {
    this.setState({ phone: e.target.value });
  };

  handlPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  isEmpty(str) {
    return !str || str.length === 0;
  }

  requestToRegister = (e) => {
    e.preventDefault();
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const phone = this.state.phone;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    //validate credentials data
    if (
      this.isEmpty(firstName) ||
      this.isEmpty(lastName) ||
      this.isEmpty(email) ||
      this.isEmpty(phone) ||
      phone.length < 10 ||
      this.isEmpty(password) ||
      password.length < 8 ||
      this.isEmpty(confirmPassword) ||
      password != confirmPassword
    ) {
      // console.log("invalid data")
      // console.log(firstName)
      // console.log(lastName)
      // console.log(email)
      // console.log(phone)
      // console.log(password)
      // console.log(confirmPassword)
      this.setState({ sentRegReqSuccessfully: false });
    } else {
      const credentials = { email, password };
      this.props.register(credentials);
    }
  };

  registerSuccessAlert() {
    return (
      <div
        className="alert alert-success"
        role="alert"
        style={{
          marginTop: "10px",
        }}
      >
        Sent application to register successfully!
      </div>
    );
  }

  registerFailedAlert() {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{
          marginTop: "10px",
        }}
      >
        Failed to send register application, please check all the fields and
        your internet connectivity!
      </div>
    );
  }

  // showAlertDiv() {
  //   switch (this.state.sentRegReqSuccessfully) {
  //     case true:
  //       console.log("inside success alert");
  //       return this.registerSuccessAlert();
  //     case false:
  //       return this.registerFailedAlert();
  //     default:
  //       return null;
  //   }
  // }

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
          <div className="register-container">
            <form>
              <h3>Register</h3>
              <div className="form-group">
                <label>First name</label>
                <input
                  onChange={this.handleFirstNameChange}
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  onChange={this.handleLastNameChange}
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
              <div className="form-group">
                <label>Phone number</label>
                <input
                  onChange={this.handlePhoneChange}
                  type="number"
                  className="form-control"
                  placeholder="Phone number"
                />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  onChange={this.handleEmailChange}
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Create Password</label>
                <input
                  onChange={this.handlPasswordChange}
                  type="password"
                  className="form-control"
                  placeholder="Create password"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  onChange={this.handleConfirmPasswordChange}
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                />
              </div>
              <button
                onClick={this.requestToRegister}
                type="submit"
                className="btn btn-primary btn-block"
              >
                Register
              </button>
              {this.state.sentRegReqSuccessfully === true
                ? this.registerSuccessAlert()
                : null}
              {this.state.sentRegReqSuccessfully === false
                ? this.registerFailedAlert()
                : null}
              {this.state.sentRegReqSuccessfully === true
                ? this.props.history.push("/")
                : null}

              {/* {this.showAlertDiv()} */}
            </form>
          </div>
        </div>
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     sentRegReqSuccessfully: state.auth.sentRegisterRequest,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => dispatch(register(credentials)),
  };
};

export default connect(null, mapDispatchToProps)(Register);
