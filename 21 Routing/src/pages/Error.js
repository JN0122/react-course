import React from "react";

import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

const ErrorPage = () => {
  const response = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (response?.status === 404) {
    title = "Cannot find element!";
  } else if (response?.status === 500) {
    message = JSON.parse(response.data).message;
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
