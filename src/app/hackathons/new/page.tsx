import Link from "next/link";
import NewHackathonForm from "~/components/forms/new-hackathon";

export default function NewHackathonPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-around">
        <div>
          <h1 className="text-3xl font-bold">Organise a Hackathon</h1>
          <p className="text-lg">
            Organise a hackathon and invite your friends to join.
          </p>
        </div>

        <Link className="btn btn-accent" href="/hackathons">
          Hackathons
        </Link>
      </div>
      <NewHackathonForm />
    </div>
  );
}
