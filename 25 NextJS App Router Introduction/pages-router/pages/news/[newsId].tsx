import { useRouter } from "next/router";

export default function NewsDetailsPage() {
  const router = useRouter();

  return <h1>News Details Page for post: {router.query.newsId}</h1>;
}
