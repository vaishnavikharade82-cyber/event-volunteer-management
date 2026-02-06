import { Suspense } from "react";
import VolunteerForm from "./VolunteerForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VolunteerForm />
    </Suspense>
  );
}