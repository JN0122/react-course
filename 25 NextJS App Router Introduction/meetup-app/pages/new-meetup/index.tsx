import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { MeetupInput } from "@/lib/types/meetup";

export default function NewMeetupPage() {
  function handleAddMeetup(enteredMeetupData: MeetupInput) {
    console.log(enteredMeetupData);
  }

  return <NewMeetupForm onAddMeetup={handleAddMeetup} />;
}
