import { connectDatabase, getEventById, getFeaturedEventDocument } from "@/helper/db-util";
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
      const eventId = req.query.eventId;
      const eventDetailPage = await getEventById(client, "events", {id: eventId});
      res.status(201).json({ eventDetailPage: eventDetailPage });
    } catch (error) {
      res.status(500).json({ message: "Getting event page failed!" });
    }
  }
  // client.close();
}
