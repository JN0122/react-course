import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Meetup } from "@/lib/types/meetup";

const DUMMY_MEETUP: Meetup = {
  id: "m1",
  title: "First Meetup",
  image: "http://media.krakow.travel/photos/18784/noresize.jpg",
  address: "123 Main St, City",
  description: "This is the first meetup.",
};

export default function MeetupDetails() {
  return <MeetupDetail meetupData={DUMMY_MEETUP} />;
}
