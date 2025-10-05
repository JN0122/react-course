import { NextPage } from "next";

const NotFoundPage: NextPage = () => {
  return (
    <main className="not-found">
      <h1>Page Not Found</h1>
      <p>We could not found requested page or resource!</p>
    </main>
  );
};

export default NotFoundPage;
