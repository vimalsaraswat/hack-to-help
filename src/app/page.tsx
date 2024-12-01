import Link from "next/link";

import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Hack<span className="text-[hsl(280,100%,70%)]">4</span>Good
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="/hackathons"
            >
              <h3 className="text-2xl font-bold">Explore Hackathons →</h3>
              <div className="text-lg">
                Explore the hackathons that are happening around the world.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="/hackathons/new"
            >
              <h3 className="text-2xl font-bold">Organise Hackathons →</h3>
              <div className="text-lg">
                Create your own hackathon and invite the world to join.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            {/* <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p> */}

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="btn btn-secondary btn-lg"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
