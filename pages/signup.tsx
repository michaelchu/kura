import React from "react";
import { IconEye } from "@tabler/icons";

export default function SignUp() {
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
                Create new account
              </h2>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
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
              <div className="mb-3">
                <label className="form-check">
                  <input type="checkbox" className="form-check-input" />
                  <span className="form-check-label">
                    Agree the{" "}
                    <a href="./terms-of-service.html" tabIndex={-1}>
                      terms and policy
                    </a>
                    .
                  </span>
                </label>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">
                  Create new account
                </button>
              </div>
            </div>
          </form>
          <div className="text-center text-muted mt-3">
            Already have account?{" "}
            <a href="/login" tabIndex={-1}>
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
