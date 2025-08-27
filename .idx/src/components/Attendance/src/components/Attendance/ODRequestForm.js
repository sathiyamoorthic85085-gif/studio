import { useState } from 'react';
import axios from 'axios';

const ODRequestForm = ({ studentId }) => {
  const [formData, setFormData] = useState({
    date: '',
    subjectId: '',
    reason: '',
    document: null
  });
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Fetch subjects for the student
    const fetchSubjects = async () => {
      const response = await axios.get(`/api/students/${studentId}/subjects`);
      setSubjects(response.data);
    };
    
    fetchSubjects();
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      document: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('date', formData.date);
    data.append('subjectId', formData.subjectId);
    data.append('reason', formData.reason);
    if (formData.document) {
      data.append('document', formData.document);
    }

    try {
      await axios.post('/api/od-requests', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('OD request submitted successfully!');
      // Reset form
      setFormData({
        date: '',
        subjectId: '',
        reason: '',
        document: null
      });
    } catch (error) {
      console.error('Error submitting OD request:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Submit OD Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Subject:</label>
          <select
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Reason:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
            rows="3"
          />
        </div>
        <div>
          <label className="block mb-1">Supporting Document:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit OD Request
        </button>
      </form>
    </div>
  );
};

export default ODRequestForm;
