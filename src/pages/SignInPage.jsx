import { SignHeader } from "../cmps/SignHeader";
import { SignInForm } from "../cmps/SignInForm";
import { SignFooter } from "../cmps/SignFooter";

export function SignInPage() {
  return (
    <div>
      <SignHeader />
      <SignInForm />
      <SignFooter />
    </div>
  );
}
