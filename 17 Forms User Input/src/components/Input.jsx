export default function Input({ id, label, error, ...rest }) {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
}
