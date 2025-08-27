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

// Initialize database tables with complete student schema
export async function initDb() {
  const db = await openDb();
  
  // Create users table with enhanced fields
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      register_no TEXT UNIQUE NOT NULL,
      roll_no TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('student', 'teacher', 'hod', 'admin')),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      gender TEXT NOT NULL CHECK(gender IN ('MALE', 'FEMALE')),
      dob DATE NOT NULL,
      blood_group TEXT,
      mobile_no TEXT,
      profile_picture TEXT,
      class TEXT,
      subject TEXT,
      aadhar_no TEXT,
      community TEXT,
      geographical_area TEXT,
      caste TEXT,
      religion TEXT,
      mother_tongue TEXT,
      nationality TEXT,
      state TEXT,
      profile_status TEXT DEFAULT 'ACTIVE',
      twelfth_reg_no TEXT,
      twelfth_school_name TEXT,
      twelfth_school_address TEXT,
      twelfth_school_board TEXT,
      twelfth_school_type TEXT,
      father_farmer TEXT CHECK(father_farmer IN ('YES', 'NO')),
      medium_instruction TEXT,
      physically_challenged TEXT CHECK(physically_challenged IN ('YES', 'NO')),
      ex_service_relative TEXT,
      sports_representation TEXT,
      qualification_exam TEXT,
      extracurricular TEXT,
      studied_tamil TEXT CHECK(studied_tamil IN ('YES', 'NO')),
      tamil_origin TEXT CHECK(tamil_origin IN ('YES', 'NO')),
      ncc_certificate TEXT CHECK(ncc_certificate IN ('YES', 'NO')),
      completion_month_year TEXT,
      transport_required TEXT CHECK(transport_required IN ('YES', 'NO')),
      bus_stop TEXT,
      hostel_required TEXT CHECK(hostel_required IN ('YES', 'NO')),
      father_name TEXT,
      father_mobile TEXT,
      father_occupation TEXT,
      father_annual_income INTEGER,
      mother_name TEXT,
      mother_mobile TEXT,
      mother_occupation TEXT,
      address TEXT,
      area_village_town TEXT,
      pincode TEXT,
      communication_address TEXT,
      communication_area TEXT,
      communication_pincode TEXT,
      degree_branch TEXT,
      admission_no TEXT,
      umis_no TEXT,
      student_status TEXT,
      mode_education TEXT,
      admission_date DATE,
      scheme TEXT,
      date_of_joining DATE,
      date_of_leaving DATE,
      mode_admission TEXT,
      section TEXT,
      quota TEXT,
      medium TEXT,
      current_semester TEXT,
      is_hosteller TEXT CHECK(is_hosteller IN ('YES', 'NO')),
      is_transport TEXT CHECK(is_transport IN ('YES', 'NO')),
      special_categories TEXT,
      part_i_language TEXT,
      remarks TEXT,
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
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (student_id) REFERENCES users (id)
    )
  `);
  
  console.log('Database initialized successfully');
  return db;
}

// Insert sample student data from the Excel
export async function seedStudents() {
  const db = await openDb();
  
  // Check if data already exists
  const userCount = await db.get('SELECT COUNT(*) as count FROM users WHERE role = "student"');
  if (userCount.count > 0) {
    console.log('Student data already seeded');
    return;
  }
  
  // Sample student data based on the Excel
  const students = [
    {
      register_no: 'ES24EI01', roll_no: 'ES24EI01', email: 'abhiruben2402@gmail.com', 
      password: 'student123', role: 'student', first_name: 'ABHI RUBEN', last_name: 'S',
      gender: 'MALE', dob: '2007-02-24', blood_group: 'B+', mobile_no: '7708914279',
      aadhar_no: '400211993037', community: 'MBC', geographical_area: 'RURAL',
      caste: 'KULALA-KUYAVAR', religion: 'HINDU', mother_tongue: 'TAMIL', nationality: 'INDIAN',
      state: 'TAMILNADU', twelfth_reg_no: '2313138153', 
      twelfth_school_name: 'ZKM HR SEC SCHOOL', twelfth_school_address: 'BOODINAYAKKANUR',
      twelfth_school_board: 'STATEBOARD', twelfth_school_type: 'GOVERNMENT AIDED',
      father_farmer: 'YES', medium_instruction: 'ENGLISH', physically_challenged: 'NO',
      ex_service_relative: 'NIL', sports_representation: 'NO', qualification_exam: '12TH',
      extracurricular: 'NIL', studied_tamil: 'YES', tamil_origin: 'NO', ncc_certificate: 'NO',
      completion_month_year: 'MAR&2024', transport_required: 'NO', bus_stop: '',
      hostel_required: 'YES', father_name: 'SRINEVASAN', father_mobile: '9787770980',
      father_occupation: 'TEXTILE', father_annual_income: 100000, mother_name: 'SUTHA.S',
      mother_mobile: '9787770980', mother_occupation: 'HOMEMAKER',
      address: '83/78 BHARATHI NARAYANASAMY STREET, JKK PATTI, BODINAYAKANUR,THENI-625513',
      area_village_town: 'BODINAYAKANUR', pincode: '625513',
      communication_address: '83/78 BHARATHI NARAYANASAMY STREET, JKK PATTI BODINAYAKANUR ,THENI-625513',
      communication_area: 'BODINAYAKANUR', communication_pincode: '625513',
      degree_branch: 'B.E-ELECTRONICS AND INSTRUMENTATION ENGINEERING',
      admission_no: '', umis_no: '', student_status: 'REGULAR', mode_education: 'FULL TIME',
      admission_date: '2024-09-06', scheme: 'GQS', date_of_joining: '2024-09-06',
      mode_admission: 'DIRECT', section: 'A', quota: 'GQ', medium: 'ENGLISH',
      current_semester: 'I', is_hosteller: 'YES', is_transport: 'NO',
      special_categories: 'NO', part_i_language: 'TAMIL', remarks: ''
    },
    // Add all 30 more students following the same pattern
    // This is just a sample - you would add all students from the Excel
  ];
  
  for (const student of students) {
    await db.run(
      `INSERT INTO users (
        register_no, roll_no, email, password, role, first_name, last_name, gender, dob, 
        blood_group, mobile_no, aadhar_no, community, geographical_area, caste, religion, 
        mother_tongue, nationality, state, twelfth_reg_no, twelfth_school_name, 
        twelfth_school_address, twelfth_school_board, twelfth_school_type, father_farmer, 
        medium_instruction, physically_challenged, ex_service_relative, sports_representation, 
        qualification_exam, extracurricular, studied_tamil, tamil_origin, ncc_certificate, 
        completion_month_year, transport_required, bus_stop, hostel_required, father_name, 
        father_mobile, father_occupation, father_annual_income, mother_name, mother_mobile, 
        mother_occupation, address, area_village_town, pincode, communication_address, 
        communication_area, communication_pincode, degree_branch, admission_no, umis_no, 
        student_status, mode_education, admission_date, scheme, date_of_joining, 
        mode_admission, section, quota, medium, current_semester, is_hosteller, is_transport, 
        special_categories, part_i_language, remarks
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student.register_no, student.roll_no, student.email, student.password, student.role,
        student.first_name, student.last_name, student.gender, student.dob, student.blood_group,
        student.mobile_no, student.aadhar_no, student.community, student.geographical_area,
        student.caste, student.religion, student.mother_tongue, student.nationality, student.state,
        student.twelfth_reg_no, student.twelfth_school_name, student.twelfth_school_address,
        student.twelfth_school_board, student.twelfth_school_type, student.father_farmer,
        student.medium_instruction, student.physically_challenged, student.ex_service_relative,
        student.sports_representation, student.qualification_exam, student.extracurricular,
        student.studied_tamil, student.tamil_origin, student.ncc_certificate,
        student.completion_month_year, student.transport_required, student.bus_stop,
        student.hostel_required, student.father_name, student.father_mobile,
        student.father_occupation, student.father_annual_income, student.mother_name,
        student.mother_mobile, student.mother_occupation, student.address,
        student.area_village_town, student.pincode, student.communication_address,
        student.communication_area, student.communication_pincode, student.degree_branch,
        student.admission_no, student.umis_no, student.student_status, student.mode_education,
        student.admission_date, student.scheme, student.date_of_joining, student.mode_admission,
        student.section, student.quota, student.medium, student.current_semester,
        student.is_hosteller, student.is_transport, student.special_categories,
        student.part_i_language, student.remarks
      ]
    );
  }
  
  console.log('Student data inserted successfully');
}

// Initialize database on startup
initDb().then(() => seedStudents());
