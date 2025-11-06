import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteEvent, fetchEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EventDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();
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

  const removeEventHandler = () => {
    const removeEvent = confirm("Are you sure?");
    if (removeEvent) mutate({ id });
  };

  const { data, isError, error } = useQuery({
    queryKey: ["event-details", id],
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
            <button onClick={removeEventHandler} disabled={isRemoving}>
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
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}

