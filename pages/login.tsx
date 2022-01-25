import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IconLogin } from "@tabler/icons";
import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import useStorage from "../hooks/useStorage";
import useSession from "../hooks/useSession";
import { ApolloConsumer } from "@apollo/client";

export default function Login() {
  const LoginMutation = gql`
    mutation ($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
      }
    }
  `;

  const router = useRouter();
  const isSignedIn = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setItem, getItem } = useStorage();
  const [login, { loading, error }] = useMutation(LoginMutation, {
    variables: { email, password },
    onCompleted: ({ login }) => {
      setItem("token", login.token, "session");

      if (router.query?.from) {
        router.push(router.query.from as string);
      } else {
        router.push("/dashboard");
      }
    },
  });

  useEffect(() => {
    // redirect to dashboard if already logged in
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <ApolloConsumer>
      {(client) => (
        <div className="page page-center login-dark">
          <div className="container-tight py-4">
            <div className="text-center mb-4">
              <img src="/logo-dark.png" height="36" alt="" />
            </div>
            <div className="card card-md">
              <div className="card-body">
                <h1 className="text-center mb-4">Welcome Back</h1>
                <div className="card-subtitle text-center">
                  Enter your credentials to access your account.
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className={
                      error ? "form-control is-invalid" : "form-control"
                    }
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">
                    Password
                    <span className="form-label-description">
                      <a href="/forgot-password">Forgot your password?</a>
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
                <div className="form-footer">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                    onClick={() => login().then(() => client.resetStore())}
                  >
                    <IconLogin />
                    Sign in
                  </button>
                  <div className="text-center text-muted mt-3">
                    Don't have account yet?{" "}
                    <Link href="/signup">
                      <a>Sign up</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ApolloConsumer>
  );
}
