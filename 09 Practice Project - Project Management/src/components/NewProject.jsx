import { useRef } from "react";
import UserInput from "./UserInput";

export default function NewProject({ onAddProject }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function onSaveButtonClick() {
    onAddProject({
      title: title.current.value,
      description: description.current.value,
      dueDate: dueDate.current.value,
    });
  }
  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950">
            Cancel
          </button>
        </li>
        <li>
          <button
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            onClick={onSaveButtonClick}
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <UserInput type="text" title="Title" ref={title} />
        <UserInput title="Description" textArea ref={description} />
        <UserInput type="date" title="Due Date" ref={dueDate} />
      </div>
    </div>
  );
}
