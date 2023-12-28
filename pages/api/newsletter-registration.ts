import type { NextApiRequest, NextApiResponse } from "next";
import { insertDocument, connectDatabase } from "@/helper/db-util";
import { ValidateEmail } from "@/helper/email-validation";
import { MongoClient } from "mongodb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userEmail: string = req.body.email;

    const result = ValidateEmail(userEmail);
    if (!result) {
      res.status(422).json({ message: "Invalid email!" });
      return;
    }

    let client: MongoClient;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to database failed!" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Valid email!" });
  }
}
