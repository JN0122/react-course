export default function InputLabel({ label, invalid, ...passThruProps }) {
  let labelClasses = "block mb-2 text-xs font-bold tracking-wide uppercase";
  let inputClasses = "w-full px-3 py-2 leading-tight border rounded shadow";

  if (invalid) {
    labelClasses += " text-red-500";
    inputClasses += " text-red-500 bg-red-100 border-red-100";
  } else {
    labelClasses += " text-stone-200";
    inputClasses += " bg-stone-300 text-gray-700";
  }

  return (
    <p>
      <label className={labelClasses}>{label}</label>
      <input className={inputClasses} {...passThruProps} />
    </p>
  );
}
