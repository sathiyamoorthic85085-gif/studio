import { useState, useEffect } from 'react';
import StudentProfile from './StudentProfile';
import ObjectDetectionAttendance from './Attendance/ObjectDetectionAttendance';
import ODRequestSystem from './OD/ODRequestSystem';
import axios from 'axios';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('students');
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchAttendanceData = async (date, subject) => {
    try {
      const params = new URLSearchParams();
      if (date) params.append('date', date);
      if (subject) params.append('subject', subject);
      
      const response = await axios.get(`/api/attendance?${params.toString()}`);
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard - EIE Students</h1>
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('students')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'students'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'attendance'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Attendance
          </button>
          <button
            onClick={() => setActiveTab('od')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'od'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            OD Requests
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Reports
          </button>
        </nav>
      </div>

      {activeTab === 'students' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Student List */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Students List</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`p-2 rounded cursor-pointer ${
                      selectedStudent?.id === student.id
                        ? 'bg-blue-100 border-l-4 border-blue-500'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">
                      {student.register_no} - {student.first_name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {student.roll_no} • {student.section}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Details */}
          <div className="lg:col-span-3">
            {selectedStudent ? (
              <StudentProfile student={selectedStudent} />
            ) : (
              <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-500">Select a student to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="bg-white shadow rounded-lg p-6">
          <ObjectDetectionAttendance />
        </div>
      )}

      {activeTab === 'od' && (
        <div className="bg-white shadow rounded-lg p-6">
          <ODRequestSystem />
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Attendance Reports</h2>
          {/* Reports component will be implemented here */}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
