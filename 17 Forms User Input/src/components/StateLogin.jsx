import { useState } from "react";
import Input from "./Input.jsx";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation.js";

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
    isInputChanged.email &&
    !isEmail(inputValues.email) &&
    !isNotEmpty(inputValues.email);

  const passwordIsInvalid =
    isInputChanged.password && !hasMinLength(inputValues.password, 6);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          type="email"
          name="email"
          label="Email"
          error={emailIsInvalid && "Please enter a valid email address!"}
          onBlur={() => handleInputBlur("email")}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        <Input
          id="password"
          type="password"
          name="password"
          label="Password"
          error={passwordIsInvalid && "Please enter a valid password!"}
          onBlur={() => handleInputBlur("password")}
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
