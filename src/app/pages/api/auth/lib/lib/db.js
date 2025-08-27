import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Initialize database
export async function openDb() {
  return open({
    filename: './school.db',
    driver: sqlite3.Database
  });
}

// Initialize database tables
export async function initDb() {
  const db = await openDb();
  
  // Create users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'hod', 'admin')),
      name TEXT NOT NULL,
      profile_picture TEXT,
      class TEXT,
      subject TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Create attendance table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      date DATE NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('present', 'absent', 'od')),
      subject TEXT NOT NULL,
      verified_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users (id),
      FOREIGN KEY (verified_by) REFERENCES users (id)
    )
  `);
  
  // Create od_requests table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS od_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL,
      teacher_id INTEGER NOT NULL,
      date DATE NOT NULL,
      reason TEXT NOT NULL,
      evidence_image TEXT,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users (id),
      FOREIGN KEY (teacher_id) REFERENCES users (id)
    )
  `);
  
  // Create facial_profiles table for face recognition
  await db.exec(`
    CREATE TABLE IF NOT EXISTS facial_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER NOT NULL UNIQUE,
      facial_data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users (id)
    )
  `);
  
  console.log('Database initialized successfully');
  return db;
}

// Insert sample data
export async function seedDb() {
  const db = await openDb();
  
  // Check if data already exists
  const userCount = await db.get('SELECT COUNT(*) as count FROM users');
  if (userCount.count > 0) {
    console.log('Database already seeded');
    return;
  }
  
  // Insert sample users
  const sampleUsers = [
    { email: 'admin@school.com', password: 'admin123', role: 'admin', name: 'School Admin', profile_picture: '/profiles/admin.jpg' },
    { email: 'hod@school.com', password: 'hod123', role: 'hod', name: 'HOD Computer Science', profile_picture: '/profiles/hod.jpg' },
    { email: 'teacher1@school.com', password: 'teacher123', role: 'teacher', name: 'John Smith', subject: 'Mathematics', profile_picture: '/profiles/teacher1.jpg' },
    { email: 'teacher2@school.com', password: 'teacher123', role: 'teacher', name: 'Sarah Johnson', subject: 'Physics', profile_picture: '/profiles/teacher2.jpg' },
    { email: 'student1@school.com', password: 'student123', role: 'student', name: 'Alice Brown', class: '10A', profile_picture: '/profiles/student1.jpg' },
    { email: 'student2@school.com', password: 'student123', role: 'student', name: 'Bob Wilson', class: '10A', profile_picture: '/profiles/student2.jpg' },
    { email: 'student3@school.com', password: 'student123', role: 'student', name: 'Charlie Davis', class: '10B', profile_picture: '/profiles/student3.jpg' },
    { email: 'student4@school.com', password: 'student123', role: 'student', name: 'Diana Miller', class: '10B', profile_picture: '/profiles/student4.jpg' }
  ];
  
  for (const user of sampleUsers) {
    // In a real app, you should hash the password
    await db.run(
      'INSERT INTO users (email, password, role, name, profile_picture, class, subject) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user.email, user.password, user.role, user.name, user.profile_picture, user.class || null, user.subject || null]
    );
  }
  
  console.log('Sample data inserted successfully');
}

// Initialize database on startup
initDb().then(() => seedDb());
