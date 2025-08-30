import { Outlet, useNavigation } from "react-router-dom";

import EventsNavigation from "../components/EventsNavigation";

function EventsRootLayout() {
  const nav = useNavigation();

  nav.state === "loading" && console.log("Loading...");
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventsRootLayout;

