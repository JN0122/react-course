import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Meetup } from "@/lib/types/meetup";

type Props = {
  meetupData: Meetup;
};

type Params = {
  meetupId: string;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { meetupId: "m1" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params?.meetupId) {
    return { notFound: true };
  }

  const DUMMY_MEETUP: Meetup = {
    id: params.meetupId,
    title: "First Meetup",
    image: "http://media.krakow.travel/photos/18784/noresize.jpg",
    address: "123 Main St, City",
    description: "This is the first meetup.",
  };

  return { props: { meetupData: DUMMY_MEETUP } };
};

export default function MeetupDetails({
  meetupData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <MeetupDetail meetupData={meetupData} />;
}

