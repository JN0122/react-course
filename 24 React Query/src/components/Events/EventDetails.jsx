import { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import Header from "../Header.jsx";
import { queryClient } from "../../util/queryClient.js";
import { deleteEvent, fetchEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutate, isPending: isRemoving } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  const handleStartDelete = () => {
    setIsDeleting(true);
  };

  const handleStopDelete = () => {
    setIsDeleting(false);
  };

  const handleDeleteEvent = (e) => {
    e.preventDefault();
    mutate({ id });
  };

  const { data, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: (context) => fetchEvent({ id, ...context }),
  });

  let content = (
    <div id="event-details-content" className="center">
      <p className="center">Loading event details...</p>
    </div>
  );

  if (data)
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete} disabled={isRemoving}>
              {isRemoving ? "Removing..." : "Delete"}
            </button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time
                dateTime={`${data.date}T${data.time}`}
              >{`${data.date} @ ${data.time}`}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );

  if (isError)
    content = (
      <div id="event-details-content">
        <ErrorBlock
          title="Error while fetching event details"
          message={error.info?.message}
        />
      </div>
    );

  return (
    <>
      <Outlet />
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <form onSubmit={handleDeleteEvent}>
            <h2>Are you sure?</h2>
            <p>This action cannot be undone!</p>
            <div className="form-actions">
              <button className="button-text" onClick={handleStopDelete}>
                Cancel
              </button>
              <button className="button" type="submit" disabled={isRemoving}>
                {isRemoving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}

