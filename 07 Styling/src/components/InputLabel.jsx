export default function InputLabel({ label, ...passThruProps }) {
  return (
    <p>
      <label>{label}</label>
      <input {...passThruProps} />
    </p>
  );
}
