import { NextPage } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const MealDetails: NextPage<Props> = async ({ params }) => {
  const { slug } = await params;

  return <div>MealsDetails: {slug}</div>;
};

export default MealDetails;
