import { SignHeader } from "../cmps/SignHeader";
import { SignInForm } from "../cmps/SignInForm";
import { SignFooter } from "../cmps/SignFooter";
import { useEffect } from "react";

export function SignInPage() {
  useEffect(() => {
    //set page container padding 0
    document.querySelector(".page-container").style.padding = "0";
    return () => {
      //reset page container padding
      document.querySelector(".page-container").style.padding = "0 20px";
    };
  }, []);
  return (
    <div className="sign-in-page">
      <SignHeader />
      <SignInForm />
      <SignFooter />
    </div>
  );
}
