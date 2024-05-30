import { SignHeader } from "../cmps/SignHeader";
import { SignInForm } from "../cmps/SignInForm";
import { SignFooter } from "../cmps/SignFooter";
import { useEffect } from "react";

export function SignInPage() {
  return (
    <div className="sign-in-page">
      <SignHeader />
      <SignInForm />
      <SignFooter />
    </div>
  );
}
