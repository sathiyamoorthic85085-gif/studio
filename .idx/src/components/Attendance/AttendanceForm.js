import { useState } from 'react';
import axios from 'axios';

const AttendanceForm = ({ subjectId, date }) => {
  const [attendance, setAttendance] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students for this subject
    const fetchStudents = async () => {
      const response = await axios.get(`/api/students?subject=${subjectId}`);
      setStudents(response.data);
      
      // Initialize attendance state
      const initialAttendance = {};
      response.data.forEach(student => {
        initialAttendance[student.id] = 'present'; // Default to present
      });
      setAttendance(initialAttendance);
    };
    
    fetchStudents();
  }, [subjectId]);

  const handleStatusChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/attendance', {
        subjectId,
        date,
        attendance
      });
      alert('Attendance submitted successfully!');
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Attendance for {new Date(date).toLocaleDateString()}</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Student Name</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td className="border border-gray-300 p-2">{student.name}</td>
              <td className="border border-gray-300 p-2">
                <select 
                  value={attendance[student.id] || 'present'}
                  onChange={(e) => handleStatusChange(student.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="od">OD</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendanceForm;
