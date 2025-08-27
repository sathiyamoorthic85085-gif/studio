import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  if (req.method === "POST") {
    try {
      const { date, subjectId, reason } = req.body;
      const document = req.files?.document;
      
      let documentPath = null;
      if (document) {
        // Save the document
        const bytes = await document.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'od-documents');
        // You might want to use fs.mkdirSync(uploadsDir, { recursive: true }) here
        
        const filename = `${Date.now()}_${document.name}`;
        documentPath = path.join('/uploads/od-documents', filename);
        await writeFile(path.join(process.cwd(), 'public', documentPath), buffer);
      }
      
      // Create OD request
      const odRequest = await db.od_requests.create({
        data: {
          student_id: session.user.id, // Assuming the student is making the request
          faculty_id: null, // Will be set when reviewed by faculty
          subject_id: parseInt(subjectId),
          date: new Date(date),
          reason,
          supporting_document: documentPath,
          status: "pending"
        }
      });
      
      res.status(200).json({ message: "OD request submitted successfully", odRequest });
    } catch (error) {
      console.error("Error submitting OD request:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
