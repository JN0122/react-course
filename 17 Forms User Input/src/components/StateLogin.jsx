import Input from "./Input.jsx";
import { hasMinLength, isEmail, isNotEmpty } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

function isEmailValid(value) {
  return isEmail(value) && isNotEmpty(value);
}

export default function Login() {
  const {
    value: email,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    hasError: hasEmailError,
  } = useInput("", isEmailValid);

  const {
    value: password,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    hasError: hasPasswordError,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();
    if (hasPasswordError || hasEmailError) return;
    console.log({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          type="email"
          name="email"
          label="Email"
          error={hasEmailError && "Please enter a valid email address!"}
          value={email}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
        />
        <Input
          id="password"
          type="password"
          name="password"
          label="Password"
          error={hasPasswordError && "Please enter a valid password!"}
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
