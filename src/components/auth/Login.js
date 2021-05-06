import React from "react";

const Login = () => {
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
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            {/* <p className="forgot-password text-right">
              Forgot password?
            </p> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
