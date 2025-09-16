"use client";
import { useOptimistic } from "react";

import { sleep } from "@/lib/sleep";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const reserveSeat = async (flight: string) => sleep(2000);
const processPayment = async (passenger: string) => sleep(2000);
const sendConfirmation = async (flight: string, passenger: string) => sleep(2000);

// NOTE: useOptimistic is a React Hook that lets you show a different state
// while an async action is underway. So it will automatically falls back when the action fails or completes,

// https://www.epicreact.dev/use-optimistic-to-make-your-app-feel-instant-zvyuv
// https://medium.com/@mayukhkchanda/optimistic-ui-useoptimistic-in-react-19-31c05a655876
export function OptimisticBookingForm() {
  // NOTE: using useState() instead of useOptimistic() will NOT work
  // const [message, setMessage] = useState("Ready to book");
  const [message, setMessage] = useOptimistic("Ready to book");

  async function handleBooking(formData: FormData) {
    const flight = formData.get("flight") as string;
    const passenger = formData.get("passenger") as string;
    await reserveSeat(flight);

    setMessage("Processing payment...");
    await processPayment(passenger);

    setMessage("Sending confirmation...");
    const bookingId = await sendConfirmation(flight, passenger);

    setMessage("Booking complete! Redirecting...");
    console.log(`Redirecting to /booking/${bookingId}`);
  }

  return (
    <form
      // NOTE: The action is automatically treated as a transition,
      // so anything that happens during the action which trigger components to suspend will be a part of that same transition
      action={handleBooking}
      // NOTE: Same is not true for the simple onSubmit handler
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   handleBooking(new FormData(e.currentTarget));
      // }}
    >
      <Input name="passenger" placeholder="Passenger Name" required />
      <Input name="flight" placeholder="Flight Number" required />
      <Button type="submit">Book Flight</Button>
      <div className="mt-2">
        <strong>Status:</strong> {message}
      </div>
    </form>
  );
}
export default function App({ title }: { title: string }) {
  return (
    <>
      <h3>{title}</h3>
      <OptimisticBookingForm />
    </>
  );
}
