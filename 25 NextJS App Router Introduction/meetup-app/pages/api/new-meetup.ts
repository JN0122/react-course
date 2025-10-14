import { NextApiRequest, NextApiResponse } from "next";
import { closeClient, getClient, getCollection } from "@/lib/database/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { title, image, address, description } = req.body;

  const client = await getClient();
  const meetupsCollection = getCollection(client);

  const result = await meetupsCollection.insertOne({
    title,
    image,
    address,
    description,
  });

  closeClient(client);

  console.log(result);

  res.status(201).json({ message: "Meetup inserted!" });
}
