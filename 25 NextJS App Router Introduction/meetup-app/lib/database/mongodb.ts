import { MongoClient } from "mongodb";

export async function getClient() {
  const client = await MongoClient.connect(
    "mongodb+srv://xxkubanxxmongo_db_user:rIOQVf1YKrVoJQhf@cluster0.cr2mzuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  client.db();

  return client;
}

export function getCollection(client: MongoClient) {
  return client.db().collection("meetups");
}

export function closeClient(client: MongoClient) {
  client.close();
}
