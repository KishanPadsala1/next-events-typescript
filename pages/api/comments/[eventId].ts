import {
  connectDatabase,
  getAllDocument,
  insertDocument,
} from "@/helper/db-util";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const eventId = req.query.eventId;

  let client: MongoClient;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      res.status(201).json({ message: "Added comment!", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const document = await getAllDocument(client, "comments", eventId, {
        _id: -1,
      });
      res.status(201).json({ comments: document });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }
  client.close();
}
