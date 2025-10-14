import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ObjectId } from "mongodb";

import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Meetup } from "@/lib/types/meetup";
import { closeClient, getClient, getCollection } from "@/lib/database/mongodb";
import Head from "next/head";

type Props = {
  meetupData: Meetup;
};

type Params = {
  meetupId: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await getClient();
  const meetupsCollection = getCollection(client);

  const meetupIds = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  closeClient(client);

  return {
    paths: meetupIds.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const meetupId = params?.meetupId;

  if (!meetupId) return { notFound: true };

  const client = await getClient();
  const meetupsCollection = getCollection(client);

  const meetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  closeClient(client);

  if (!meetup) return { notFound: true };

  const meetupData: Meetup = {
    id: meetup._id.toString(),
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
    description: meetup.description,
  };

  return { props: { meetupData } };
};

export default function MeetupDetails({
  meetupData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail meetupData={meetupData} />
    </>
  );
}

