import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/lib/db";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const { id } = req.query;
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  if (req.method === "GET") {
    try {
      const student = await db.get(
        "SELECT * FROM users WHERE id = ? AND role = 'student'",
        [id]
      );
      
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      
      res.status(200).json(student);
    } catch (error) {
      console.error("Error fetching student:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
