import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Image from 'next/image';

const StudentProfile = ({ student }) => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowWebcam(false);
    // Here you would send this image to your facial recognition API
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Picture Section */}
        <div className="w-full md:w-1/3">
          <div className="relative">
            {student.profile_picture ? (
              <Image
                src={student.profile_picture}
                alt={student.first_name}
                width={300}
                height={300}
                className="rounded-lg"
              />
            ) : (
              <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No Profile Picture</span>
              </div>
            )}
            
            {/* Facial Recognition Buttons */}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => setShowWebcam(!showWebcam)}
                className="w-full bg-blue-500 text-white py-2 rounded"
              >
                {showWebcam ? 'Cancel' : 'Capture Photo'}
              </button>
              
              {capturedImage && (
                <button
                  onClick={() => {
                    // Save to facial recognition system
                    console.log('Save facial data');
                  }}
                  className="w-full bg-green-500 text-white py-2 rounded"
                >
                  Save Facial Data
                </button>
              )}
            </div>
          </div>

          {/* Webcam Capture */}
          {showWebcam && (
            <div className="mt-4">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full rounded"
              />
              <button
                onClick={captureImage}
                className="w-full bg-blue-500 text-white py-2 rounded mt-2"
              >
                Capture
              </button>
            </div>
          )}
        </div>

        {/* Student Information */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">
            {student.first_name} {student.last_name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Personal Details</h3>
              <p><span className="font-medium">Register No:</span> {student.register_no}</p>
              <p><span className="font-medium">Roll No:</span> {student.roll_no}</p>
              <p><span className="font-medium">DOB:</span> {student.dob}</p>
              <p><span className="font-medium">Gender:</span> {student.gender}</p>
              <p><span className="font-medium">Blood Group:</span> {student.blood_group}</p>
              <p><span className="font-medium">Mobile:</span> {student.mobile_no}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Academic Details</h3>
              <p><span className="font-medium">Degree:</span> {student.degree_branch}</p>
              <p><span className="font-medium">Semester:</span> {student.current_semester}</p>
              <p><span className="font-medium">Section:</span> {student.section}</p>
              <p><span className="font-medium">12th Reg No:</span> {student.twelfth_reg_no}</p>
              <p><span className="font-medium">School:</span> {student.twelfth_school_name}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Family Details</h3>
              <p><span className="font-medium">Father:</span> {student.father_name}</p>
              <p><span className="font-medium">Father Mobile:</span> {student.father_mobile}</p>
              <p><span className="font-medium">Occupation:</span> {student.father_occupation}</p>
              <p><span className="font-medium">Mother:</span> {student.mother_name}</p>
              <p><span className="font-medium">Mother Mobile:</span> {student.mother_mobile}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Address</h3>
              <p>{student.address}</p>
              <p>{student.area_village_town} - {student.pincode}</p>
              <p><span className="font-medium">State:</span> {student.state}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
