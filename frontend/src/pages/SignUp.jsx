import SignUpForm from "../forms/SignUpForm";

const SignUp = () => {
  return (
    <div className="sign-up-container">
      <div className="sign-up-form-container">
        <SignUpForm />
      </div>
      <div className="sign-up-img-container">
        <img src="registerImg.jpg" alt="a shelf of books" />
      </div>
    </div>
  );
};

export default SignUp;
