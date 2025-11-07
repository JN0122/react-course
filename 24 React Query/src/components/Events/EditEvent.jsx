import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from "../../util/queryClient.js";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const submit = useSubmit();

  const { state } = useNavigation();
  const isUpdating = state === "submitting";

  const { data, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
    staleTime: 10_000,
  });

  function handleClose() {
    navigate("../");
  }

  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });
  }

  let content = (
    <div className="center">
      <LoadingIndicator />
    </div>
  );

  if (data)
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </EventForm>
    );

  if (isError)
    content = (
      <>
        {isError && (
          <ErrorBlock
            title="Failed to load event"
            message={
              error.info?.message ||
              "Please check your inputs and try again later."
            }
          />
        )}
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  const { id } = params;

  return queryClient.fetchQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });
}

export async function action({ request, params }) {
  const data = await request.formData();
  const updatedEventData = Object.fromEntries(data);

  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(["events"]);
  return redirect("../");
}

