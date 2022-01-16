import React, { useState } from "react";
import { IconEye } from "@tabler/icons";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";
import Link from "next/link";
import useStorage from "../hooks/useStorage";

export default function SignUp() {
  const SignUpMutation = gql`
    mutation ($email: String!, $password: String!) {
      signUp(email: $email, password: $password) {
        token
      }
    }
  `;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setItem } = useStorage();
  const router = useRouter();

  const [signUp, { loading, error }] = useMutation(SignUpMutation, {
    variables: { email, password },
    onCompleted: ({ signUp }) => {
      setItem("token", signUp.token, "session");
      router.push("/dashboard");
    },
    onError: (_error) => {},
  });

  return (
    <div className="antialiased border-top-wide border-primary d-flex flex-column">
      <div className="page page-center">
        <div className="container-tight py-4">
          <div className="text-center mb-4">
            <a href=".">
              <img src="./static/logo.svg" height="36" alt="" />
            </a>
          </div>
          <div className="card card-md">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Create new account
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
              <div className="mb-3">
                <label className="form-label">Password</label>
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
                  Oops! User already exist!
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
                  onClick={() => signUp()}
                >
                  Create new account
                </button>
              </div>
            </div>
          </div>
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
