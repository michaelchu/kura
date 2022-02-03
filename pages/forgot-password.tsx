import React from "react";
import { IconMail } from "@tabler/icons";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="page page-center login-dark">
      <div className="container-tight py-4">
        <div className="text-center mb-4">
          <img
            src="/logo-dark.png"
            height="36"
            alt="kura"
            className="navbar-brand-image"
          />
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
              <a className="btn btn-cyan w-100">
                <IconMail />
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
