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
      const { studentId, date, status, subject, evidenceImage, detectionData } = req.body;
      
      // Insert attendance record
      const result = await db.run(
        `INSERT INTO attendance (student_id, date, status, subject, evidence_image, detection_data)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [studentId, date, status, subject, evidenceImage, JSON.stringify(detectionData)]
      );
      
      res.status(200).json({ 
        message: "Attendance recorded successfully",
        id: result.lastID
      });
    } catch (error) {
      console.error("Error recording attendance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      const { date, subject } = req.query;
      
      let query = `
        SELECT a.*, u.first_name, u.last_name, u.register_no
        FROM attendance a
        JOIN users u ON a.student_id = u.id
        WHERE 1=1
      `;
      let params = [];
      
      if (date) {
        query += " AND a.date = ?";
        params.push(date);
      }
      
      if (subject) {
        query += " AND a.subject = ?";
        params.push(subject);
      }
      
      query += " ORDER BY a.created_at DESC";
      
      const records = await db.all(query, params);
      
      res.status(200).json(records);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
