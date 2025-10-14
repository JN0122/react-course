import { Meetup } from "@/lib/types/meetup";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

type Props = {
  meetups: Meetup[];
};

function MeetupList({ meetups }: Props) {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem key={meetup.id} data={meetup} />
      ))}
    </ul>
  );
}

export default MeetupList;

