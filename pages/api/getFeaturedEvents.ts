import { connectDatabase, getFeaturedEventDocument } from "@/helper/db-util";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let client: MongoClient;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed!" });
    return;
  }

  if (req.method === "GET") {
    try {
      const eventDocuments = await getFeaturedEventDocument(client, "events");
      res.status(201).json({ events: eventDocuments });
    } catch (error) {
      res.status(500).json({ message: "Getting events failed!" });
    }
  }
  // client.close();
}
