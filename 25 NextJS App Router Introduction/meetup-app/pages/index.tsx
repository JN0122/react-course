import { GetStaticProps } from "next";

import MeetupList from "@/components/meetups/MeetupList";
import { Meetup } from "@/lib/types/meetup";

type Props = {
  meetups: Meetup[];
};

export default function HomePage({ meetups }: Props) {
  return <MeetupList meetups={meetups} />;
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const DUMMY_MEETUPS = [
    {
      id: "m1",
      title: "First Meetup",
      image: "http://media.krakow.travel/photos/18784/noresize.jpg",
      address: "123 Main St, City",
      description: "This is the first meetup.",
    },
    {
      id: "m2",
      title: "Second Meetup",
      image: "http://media.krakow.travel/photos/18784/noresize.jpg",
      address: "456 Elm St, City",
      description: "This is the second meetup.",
    },
    {
      id: "m3",
      title: "Third Meetup",
      image: "http://media.krakow.travel/photos/18784/noresize.jpg",
      address: "789 Oak St, City",
      description: "This is the third meetup.",
    },
  ];

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10,
  };
};
