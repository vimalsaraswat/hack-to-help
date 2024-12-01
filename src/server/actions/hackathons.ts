"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import { HackathonStatus } from "../db/enums";
import { z } from "zod";

const NewHackathon = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

export async function createHackathon(formData: FormData) {
  const validatedFields = NewHackathon.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    startDate: new Date(formData.get("startDate") as string),
    endDate: new Date(formData.get("endDate") as string),
  });

  if (!validatedFields.success) {
    console.log({
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to add hackathon.",
    });
    return;
  }

  const { name, description, startDate, endDate } = validatedFields.data;

  let status = HackathonStatus.Upcoming;
  const now = new Date();

  if (startDate < now && endDate > now) {
    status = HackathonStatus.InProgress;
  } else if (startDate > now) {
    status = HackathonStatus.Completed;
  }

  try {
    await api.hackathon.create({
      name,
      description,
      startDate,
      endDate,
      status,
    });
  } catch (error) {
    const err = error as Error;
    console.log({
      message: "Error creating hackathon: " + err.message,
    });
    return;
  }

  revalidatePath("/hackathons");
  redirect("/hackathons");
}
