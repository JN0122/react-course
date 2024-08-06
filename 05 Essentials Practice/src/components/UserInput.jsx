import { useState } from "react";
import Input from "./Input";
import InputGroup from "./InputGroup";

export default function UserInputSection({ onValueChange, userInput }) {
  return (
    <section id="user-input">
      <InputGroup>
        <Input
          labelText="Initial investment"
          id="initial-investment"
          value={userInput.initialInvestment}
          onChange={(e) => onValueChange("initialInvestment", e.target.value)}
        />
        <Input
          labelText="Annual investment"
          id="annual-investment"
          value={userInput.annualInvestment}
          onChange={(e) => onValueChange("annualInvestment", e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <Input
          labelText="Expected return"
          id="expected-return"
          value={userInput.expectedReturn}
          onChange={(e) => onValueChange("expectedReturn", e.target.value)}
        />
        <Input
          labelText="Duration"
          id="duration"
          value={userInput.duration}
          onChange={(e) => onValueChange("duration", e.target.value)}
        />
      </InputGroup>
    </section>
  );
}
