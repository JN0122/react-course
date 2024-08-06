export default function Input({
  labelText,
  id,
  type = "number",
  ...passThruProps
}) {
  return (
    <p>
      <label htmlFor={id}>{labelText}</label>
      <input type={type} id={id} {...passThruProps} />
    </p>
  );
}
