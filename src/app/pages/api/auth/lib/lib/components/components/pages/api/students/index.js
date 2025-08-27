import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/lib/db";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  if (req.method === "GET") {
    try {
      const students = await db.all(`
        SELECT id, register_no, roll_no, email, first_name, last_name, gender, dob, 
               blood_group, mobile_no, class, section, profile_picture
        FROM users 
        WHERE role = 'student'
        ORDER BY register_no
      `);
      
      res.status(200).json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
