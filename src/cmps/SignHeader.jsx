import React from "react";
import { ReactSVG } from "react-svg";
import logo from "../assets/icons/logo.svg";
export function SignHeader() {
  return (
    <div className="sign-header">
      <ReactSVG src={logo} />
    </div>
  );
}
