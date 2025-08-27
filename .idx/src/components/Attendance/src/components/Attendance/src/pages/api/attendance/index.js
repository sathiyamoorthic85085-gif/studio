import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/lib/db";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  if (req.method === "POST") {
    try {
      const { subjectId, date, attendance } = req.body;
      
      // Insert attendance records
      for (const [studentId, status] of Object.entries(attendance)) {
        await db.attendance.upsert({
          where: {
            student_id_subject_id_date: {
              student_id: parseInt(studentId),
              subject_id: subjectId,
              date: new Date(date)
            }
          },
          update: {
            status
          },
          create: {
            student_id: parseInt(studentId),
            subject_id: subjectId,
            date: new Date(date),
            status
          }
        });
      }
      
      res.status(200).json({ message: "Attendance recorded successfully" });
    } catch (error) {
      console.error("Error recording attendance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
