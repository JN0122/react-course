import { Suspense } from "react";
import fs from "node:fs/promises";

import UserPromiseDemo from "@/components/UsePromisesDemo";

export default async function Home() {
  const usersPromise = new Promise((resolve) =>
    setTimeout(async () => {
      const data = await fs.readFile("dummy-db.json", "utf-8");
      const users = JSON.parse(data);
      resolve(users);
    }, 2000)
  );

  return (
    <main>
      <Suspense fallback={"Loading..."}>
        <UserPromiseDemo usersPromise={usersPromise} />
      </Suspense>
    </main>
  );
}
