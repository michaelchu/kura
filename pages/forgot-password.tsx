import React from "react";

export default function ForgotPassword() {
  return (
    <div className="page page-center login-dark">
      <div className="container-tight py-4">
        <div className="text-center mb-4">
          <a href=".">
            <img src="./static/logo.svg" height="36" alt="" />
          </a>
        </div>
        <form className="card card-md" action="." method="get">
          <div className="card-body">
            <h1 className="text-center mb-4">Forgot Your Password?</h1>
            <p className="text-muted mb-4">
              Enter your email address and your password will be reset and
              emailed to you.
            </p>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-footer">
              <a href="#" className="btn btn-primary w-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <polyline points="3 7 12 13 21 7" />
                </svg>
                Send me new password
              </a>
              <div className="text-center text-muted mt-4">
                Forget it, <a href="/login">send me back</a> to the sign in
                screen.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
