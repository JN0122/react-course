import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Modal from "../UI/Modal.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, updateEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  const {
    mutate,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: (data) => updateEvent(data),
    onMutate: async (data) => {
      const newData = data?.event;
      const oldData = queryClient.getQueryData(["events", id]);

      await queryClient.cancelQueries({ queryKey: ["events", id] });
      queryClient.setQueryData(["events", id], newData);

      return { oldData };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", id], context.oldData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", id]);
    },
  });

  function handleClose() {
    navigate("../");
  }

  function handleSubmit(formData) {
    mutate({ id, event: formData });
    handleClose();
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
        {updateError && (
          <ErrorBlock
            title="Failed to update event"
            message={
              updateError.info?.message ||
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

