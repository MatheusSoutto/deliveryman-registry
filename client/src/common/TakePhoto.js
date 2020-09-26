import React, { useEffect, useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const TakePhoto = ({ dataUri, setDataUri }) => {
  const [photo, setPhoto] = useState(dataUri);
  useEffect(() => {
    if (dataUri) {
      let buff = Buffer.from(dataUri);
      setPhoto(buff.toString());
    }
  }, [dataUri]);

  const onTakePhoto = async (dataUri) => {
    setPhoto(dataUri);
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
        idealFacingMode={FACING_MODES.ENVIRONMENT}
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