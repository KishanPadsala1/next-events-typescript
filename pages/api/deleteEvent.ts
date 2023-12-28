import {
    connectDatabase,
    deleteDocument,
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
      const { eventId } = req.body;
      try {
        const result = await deleteDocument(client, "events", eventId);
        res.status(201).json({ message: "Added event", event: result });
      } catch (error) {
        res.status(500).json({ message: "Inserting new event is failed!" });
      }
    }  
    // client.close();
  }
  