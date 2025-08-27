import { useState } from 'react';
import DressCodeChecker from '../DressCode/DressCodeChecker';
import axios from 'axios';

const ObjectDetectionAttendance = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Programming',
    'Electronics',
    'Instrumentation'
  ];

  const handleDressCodeCheck = async (result) => {
    // In a real system, you would identify the student based on detected features
    // For now, we'll use a mock student ID
    const studentId = 1; // This would be determined by your identification system
    
    // Only mark attendance if dress code is compliant and ID is present
    if (result.isCompliant && result.hasID) {
      try {
        // Submit attendance to the server
        const response = await axios.post('/api/attendance', {
          studentId,
          date: attendanceDate,
          status: 'present',
          subject: selectedSubject,
          evidenceImage: result.image,
          detectionData: result.predictions
        });
        
        // Update local state
        setAttendanceRecords(prev => [...prev, {
          studentId,
          timestamp: new Date(),
          status: 'present',
          subject: selectedSubject
        }]);
        
        alert('Attendance marked successfully!');
      } catch (error) {
        console.error('Error submitting attendance:', error);
        alert('Error marking attendance. Please try again.');
      }
    } else {
      alert('Cannot mark attendance. Dress code violation or missing ID card.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Attendance System (Object Detection)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      {selectedSubject && (
        <div>
          <DressCodeChecker onDressCodeCheck={handleDressCodeCheck} />
          
          {/* Attendance Records */}
          {attendanceRecords.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Recent Attendance Records</h3>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student ID
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceRecords.map((record, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {new Date(record.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {record.studentId}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ObjectDetectionAttendance;
