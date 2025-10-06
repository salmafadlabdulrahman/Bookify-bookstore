import SignInForm from "../forms/SignInForm";

const SignIn = () => {
  return (
    <div className="sign-up-container">
      <div className="sign-up-form-container">
        <SignInForm />
      </div>
      <div className="sign-up-img-container">
        <img src="registerImg.jpg" alt="a shelf of books" />
      </div>
    </div>
  );
};

export default SignIn;
