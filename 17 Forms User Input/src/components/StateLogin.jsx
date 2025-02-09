import { useState } from "react";

export default function Login() {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [isInputChanged, setIsInputChanged] = useState({
    email: false,
    password: false,
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputValues);
  }

  function handleInputChange(name, value) {
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //setIsInputChanged((prevState) => ({ ...prevState, [name]: false }));
  }

  function handleInputBlur(name) {
    setIsInputChanged((prev) => ({ ...prev, [name]: true }));
  }

  const emailIsInvalid =
    isInputChanged.email && !inputValues.email.includes("@");

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={() => handleInputBlur("email")}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <div className="control-error">
            {emailIsInvalid && isInputChanged.email && (
              <p>Please enter a valid email address!</p>
            )}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onBlur={() => handleInputBlur("password")}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
