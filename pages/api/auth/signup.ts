//9nKIloUWYl0R5XWO
import { connectDB } from "../../../lib/mongodb";
import { hashPassword } from "../../../lib/auth";

const handler = async (req: any, res: any) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const client = await connectDB();
    const db = client.db();

    //check if the user already exists
    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created user!" });

    client.close();
  }
};

export default handler;
