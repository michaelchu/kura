import React, { useState } from "react";
import { IconEye } from "@tabler/icons";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";

export default function SignUp() {
  const { signUp, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    signUp(email, password);
  };

  return (
    <div className="antialiased border-top-wide border-primary d-flex flex-column">
      <div className="page page-center">
        <div className="container-tight py-4">
          <div className="text-center mb-4">
            <a href=".">
              <img src="./static/logo.svg" height="36" alt="" />
            </a>
          </div>
          <form
            className="card card-md"
            method="get"
            onSubmit={(e) => onSubmit(e)}
          >
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Create new account
              </h2>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group input-group-flat">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && (
                <div className="text-danger mb-3">
                  There was an error creating your account.
                </div>
              )}
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
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  Create new account
                </button>
              </div>
            </div>
          </form>
          <div className="text-center text-muted mt-3">
            Already have account?{" "}
            <Link href="/login">
              <a>Sign in</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
