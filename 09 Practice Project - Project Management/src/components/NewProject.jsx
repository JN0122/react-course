import { useRef } from "react";
import UserInput from "./UserInput";
import Modal from "./Modal";

export default function NewProject({ onAddProject, onCancel }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const modalRef = useRef();

  function onSaveButtonClick() {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const dueDate = dueDateRef.current.value;

    if (
      title.trim() === "" ||
      description.trim() === "" ||
      dueDate.trim() === ""
    ) {
      modalRef.current.open();
      return;
    }

    onAddProject({
      title,
      description,
      dueDate,
    });
  }
  return (
    <>
      <Modal ref={modalRef} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-500 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="text-stone-800 hover:text-stone-950"
            >
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
          <UserInput type="text" title="Title" ref={titleRef} />
          <UserInput title="Description" textArea ref={descriptionRef} />
          <UserInput type="date" title="Due Date" ref={dueDateRef} />
        </div>
      </div>
    </>
  );
}
