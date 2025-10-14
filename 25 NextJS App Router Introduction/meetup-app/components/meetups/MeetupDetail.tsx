import { Meetup } from "@/lib/types/meetup";

import classes from "./MeetupDetail.module.css";

type Props = {
  meetupData: Meetup;
};

export default function MeetupDetail({ meetupData }: Props) {
  return (
    <section className={classes.detail}>
      <img src={meetupData.image} alt={meetupData.title} />
      <h1>{meetupData.title}</h1>
      <address>{meetupData.address}</address>
      <p>{meetupData.description}</p>
    </section>
  );
}
