import { Suspense } from "react";
import fs from "node:fs/promises";

import UserPromiseDemo from "@/components/UsePromisesDemo";
import ErrorBoundary from "@/components/ErrorBoundary";

export default async function Home() {
  const usersPromise = new Promise((resolve, reject) =>
    setTimeout(async () => {
      const data = await fs.readFile("dummy-db.json", "utf-8");
      const users = JSON.parse(data);
      // resolve(users);
      reject(new Error("Cannot load users"));
    }, 2000)
  );

  return (
    <main>
      <ErrorBoundary fallback={"Something went wrong!"}>
        <Suspense fallback={"Loading..."}>
          <UserPromiseDemo usersPromise={usersPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
