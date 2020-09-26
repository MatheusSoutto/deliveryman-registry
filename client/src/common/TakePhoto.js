import React from 'react';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import './camera.css';

const TakePhoto = ({ setDataUri }) => {

  const onTakePhoto = async (dataUri) => {
    setDataUri(dataUri);
  };
  const onCameraError = (error) => {
    console.error('onCameraError', error);
  };
  const onCameraStart = (stream) => {
    console.log('onCameraStart');
  };
  const onCameraStop = () => {
    console.log('onCameraStop');
  };

  return (
    <div className="start-job-container">
      <Camera
        onTakePhoto={(dataUri) => { onTakePhoto(dataUri); }}
        onCameraError={(error) => { onCameraError(error); }}
        idealResolution={{ width: 640, height: 480 }}
        imageType={IMAGE_TYPES.JPG}
        imageCompression={0.97}
        onCameraStart={(stream) => { onCameraStart(stream); }}
        onCameraStop={() => { onCameraStop(); }}
      />
    </div>
  );
}
export default TakePhoto;