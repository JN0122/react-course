import { Meetup } from "@/lib/types/meetup";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

type Props = {
  data: Meetup;
};

export default function MeetupItem({ data }: Props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={data.image} alt={data.title} />
        </div>
        <div className={classes.content}>
          <h3>{data.title}</h3>
          <address>{data.address}</address>
        </div>
        <div className={classes.actions}>
          <button>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

