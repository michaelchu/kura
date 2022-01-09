import React from "react";
import { IconEye } from "@tabler/icons";

export default function Login() {
  return (
    <div className="antialiased border-top-wide border-primary d-flex flex-column">
      <div className="page page-center">
        <div className="container-tight py-4">
          <div className="text-center mb-4">
            <a href=".">
              <img src="./static/logo.svg" height="36" alt="" />
            </a>
          </div>
          <form className="card card-md" action="." method="get">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Login to your account
              </h2>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Password
                  <span className="form-label-description">
                    <a href="/forgot-password">I forgot password</a>
                  </span>
                </label>
                <div className="input-group input-group-flat">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <span className="input-group-text">
                    <a
                      href="#"
                      className="link-secondary"
                      title="Show password"
                      data-bs-toggle="tooltip"
                    >
                      <IconEye />
                    </a>
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <label className="form-check">
                  <input type="checkbox" className="form-check-input" />
                  <span className="form-check-label">
                    Remember me on this device
                  </span>
                </label>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  Sign in
                </button>
              </div>
            </div>
          </form>
          <div className="text-center text-muted mt-3">
            Don't have account yet?{" "}
            <a href="./signup" tabIndex={-1}>
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
