import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { MeetupInput } from "@/lib/types/meetup";
import { useRouter } from "next/router";

export default function NewMeetupPage() {
  const router = useRouter();

  async function handleAddMeetup(enteredMeetupData: MeetupInput) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Cannot add new meetup!");

    router.replace("/");
  }

  return <NewMeetupForm onAddMeetup={handleAddMeetup} />;
}
