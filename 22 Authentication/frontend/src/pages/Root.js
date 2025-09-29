import {
  Outlet,
  redirect,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { getTokenDuration } from "../util/auth";
import { useEffect } from "react";

function RootLayout() {
  // const navigation = useNavigation();
  const submit = useSubmit();
  const token = useRouteLoaderData("root");

  useEffect(() => {
    if (!token) return;

    const handleLogout = () => {
      submit(null, { action: "/logout", method: "post" });
      redirect("/auth");
    };

    if (token === "EXPIRED") {
      handleLogout();
      return;
    }

    const timer = setTimeout(() => handleLogout(), getTokenDuration());

    return () => {
      clearTimeout(timer);
    };
  }, [submit, token]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

