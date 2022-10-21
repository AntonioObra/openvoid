import { MongoClient } from "mongodb";

export const connectDB = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://openvoidadmin:9nKIloUWYl0R5XWO@dev.1wkpj43.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
};
