import { GetStaticProps } from "next";
import Head from "next/head";

import MeetupList from "@/components/meetups/MeetupList";
import { closeClient, getClient, getCollection } from "@/lib/database/mongodb";
import { Meetup } from "@/lib/types/meetup";

type Props = {
  meetups: Meetup[];
};

export default function HomePage({ meetups }: Props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const client = await getClient();
  const meetupsCollection = getCollection(client);

  const results = await meetupsCollection.find().toArray();

  closeClient(client);

  return {
    props: {
      meetups: results.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        description: meetup.description,
        address: meetup.address,
        image: meetup.image,
      })),
    },
    revalidate: 10,
  };
};
