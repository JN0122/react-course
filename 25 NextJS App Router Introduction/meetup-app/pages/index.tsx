import { GetStaticProps } from "next";

import MeetupList from "@/components/meetups/MeetupList";
import { closeClient, getClient, getCollection } from "@/lib/database/mongodb";
import { Meetup } from "@/lib/types/meetup";

type Props = {
  meetups: Meetup[];
};

export default function HomePage({ meetups }: Props) {
  return <MeetupList meetups={meetups} />;
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
