import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { objectDetector } from '@/lib/objectDetection';

const DressCodeChecker = ({ onDressCodeCheck }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState(null);
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    return imageSrc;
  };

  const checkDressCode = async () => {
    setIsChecking(true);
    
    try {
      // Capture image
      const imageSrc = captureImage();
      
      // Create image element for processing
      const img = new Image();
      img.src = imageSrc;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      // Detect objects
      const predictions = await objectDetector.detectObjects(img);
      
      // Check dress code compliance
      const dressCodeResult = objectDetector.checkDressCode(predictions);
      
      // Check for ID card
      const idCardResult = objectDetector.checkForIDCard(predictions);
      
      const finalResult = {
        ...dressCodeResult,
        hasID: idCardResult.hasID,
        idConfidence: idCardResult.confidence,
        timestamp: new Date().toISOString(),
        image: imageSrc,
        predictions
      };
      
      setResults(finalResult);
      
      if (onDressCodeCheck) {
        onDressCodeCheck(finalResult);
      }
    } catch (error) {
      console.error('Error checking dress code:', error);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Dress Code Checker</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full rounded"
          />
          <button
            onClick={checkDressCode}
            disabled={isChecking}
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
          >
            {isChecking ? 'Checking...' : 'Check Dress Code'}
          </button>
        </div>
        
        {results && (
          <div className="w-full md:w-1/2">
            <h3 className="font-semibold mb-2">Results:</h3>
            
            <div className={`p-3 rounded mb-2 ${
              results.isCompliant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <p className="font-semibold">
                {results.isCompliant ? 'Dress Code Compliant' : 'Dress Code Violation'}
              </p>
            </div>
            
            <div className="mb-2">
              <p className="font-semibold">ID Card: {results.hasID ? 'Present' : 'Missing'}</p>
              {results.hasID && (
                <p>Confidence: {(results.idConfidence * 100).toFixed(1)}%</p>
              )}
            </div>
            
            {results.violations.length > 0 && (
              <div className="mb-2">
                <p className="font-semibold">Violations:</p>
                <ul className="list-disc list-inside">
                  {results.violations.map((violation, index) => (
                    <li key={index}>{violation}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div>
              <p className="font-semibold">Detected Items:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {results.detectedItems.map((item, index) => (
                  <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DressCodeChecker;
