import {
  connectDatabase,
  getAllEventDocument,
  insertDocument,
} from "@/helper/db-util";
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

  if (req.method === "POST") {
    const { newEvent } = req.body;
    try {
      const result = await insertDocument(client, "events", newEvent);
      res.status(201).json({ message: "Added event", event: newEvent });
    } catch (error) {
      res.status(500).json({ message: "Inserting new event is failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const eventDocuments = await getAllEventDocument(client, "events");
      res.status(201).json({ events: eventDocuments });
    } catch (error) {
      res.status(500).json({ message: "Getting events failed!" });
    }
  }
  // client.close();
}
