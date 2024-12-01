import Link from "next/link";
import HackathonCard from "~/components/hackathon-card";
import { api, HydrateClient } from "~/trpc/server";

export default async function HackathonsPage() {
  const hackathons = await api.hackathon.getAll();

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <div className="flex justify-around">
          <div>
            <h1 className="text-3xl font-bold">Hackathons</h1>
            <p className="text-lg">
              A list of all the hackathons that are currently happening.
            </p>
          </div>

          <Link href="/hackathons/new">
            <button className="btn btn-accent">Organise Hackathon</button>
          </Link>
        </div>

        {hackathons.length > 0 ? (
          <div className="mx-auto grid grid-cols-1 gap-4 lg:grid-cols-2">
            {hackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} data={hackathon} />
            ))}
          </div>
        ) : (
          <p className="text-center">No hackathons found</p>
        )}
      </div>
    </HydrateClient>
  );
}
