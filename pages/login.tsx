import React, { useState } from "react";
import { IconEye } from "@tabler/icons";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loading, error } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
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
                Login to your account
              </h2>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className={error ? "form-control is-invalid" : "form-control"}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
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
                    className={
                      error ? "form-control is-invalid" : "form-control"
                    }
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && (
                <div className="text-danger mb-3">
                  Oops! The email/password you entered is incorrect.
                </div>
              )}
              <div className="mb-2">
                <label className="form-check">
                  <input type="checkbox" className="form-check-input" />
                  <span className="form-check-label">
                    Remember me on this device
                  </span>
                </label>
              </div>
              <div className="form-footer">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
          <div className="text-center text-muted mt-3">
            Don't have account yet?{" "}
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
