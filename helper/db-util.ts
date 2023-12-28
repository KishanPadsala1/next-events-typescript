import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://kishanpadsala:kishan@cluster0.aj5uioa.mongodb.net/events"
  );

  return client;
}

export async function insertDocument(
  client: MongoClient,
  collection: string,
  document: {}
) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function deleteDocument(
  client: MongoClient,
  collection: string,
  id: string
) {
  const db = client.db();

  const result = await db.collection(collection).deleteOne({ id: id });

  return result;
}

export async function getAllDocument(
  client: MongoClient,
  collection: string,
  eventId: string | string[] | undefined,
  sort: { _id: -1 | 1 }
) {
  const db = client.db();

  const documents = db
    .collection(collection)
    .find({ eventId: eventId })
    .sort(sort)
    .toArray();

  return documents;
}

export async function getAllEventDocument(
  client: MongoClient,
  collection: string
) {
  const db = client.db();

  const documents = db.collection(collection).find().toArray();

  return documents;
}

export async function getFeaturedEventDocument(
  client: MongoClient,
  collection: string
) {
  const db = client.db();

  const documents = db
    .collection(collection)
    .find({ isFeatured: true })
    .toArray();

  return documents;
}

export async function getEventById(
  client: MongoClient,
  collection: string,
  document: { id: string | string[] | undefined }
) {
  const db = client.db();
  const documents = db.collection(collection).findOne(document);

  return documents;
}
