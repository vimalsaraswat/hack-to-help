import { createHackathon } from "~/server/actions/hackathons";

export default function NewHackathonForm() {
  return (
    <form
      action={createHackathon}
      className="mx-auto flex w-full max-w-xs flex-col items-center gap-4 md:max-w-lg lg:max-w-2xl"
    >
      <label className="form-control w-full">
        <span className="label-text">What is your name?</span>
        <input
          type="text"
          name="name"
          placeholder="Hackathon Name"
          className="input input-bordered w-full"
          required
        />
      </label>
      <label className="form-control w-full">
        <span className="label-text">Your bio</span>
        <textarea
          className="textarea textarea-bordered h-24"
          name="description"
          placeholder="A brief description of your hackathon"
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text">Start date and time of hackathon?</span>
        <input
          name="startDate"
          className="input input-bordered w-full"
          type="datetime-local"
          required
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text">End date and time of hackathon?</span>
        <input
          name="endDate"
          className="input input-bordered w-full"
          type="datetime-local"
          required
        />
      </label>
      <button className="btn btn-primary w-full" type="submit">
        Submit
      </button>
    </form>
  );
}
