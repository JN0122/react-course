import { forwardRef } from "react";

export default forwardRef(function UserInput(
  { textArea, title, ...passThruProps },
  ref
) {
  const userInputClasses =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {title}
      </label>
      {textArea ? (
        <textarea
          ref={ref}
          className={userInputClasses}
          {...passThruProps}
        ></textarea>
      ) : (
        <input ref={ref} className={userInputClasses} {...passThruProps} />
      )}
    </p>
  );
});
