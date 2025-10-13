import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1>Homepage</h1>
      <ul>
        <li>
          <Link href="/news">News</Link>
        </li>
        <li>
          <Link href="/news/123">Post 123</Link>
        </li>
      </ul>
    </>
  );
}
