import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const View = (props) => {
  const history = useHistory();
  const [deliveryman, setDeliveryman] = useState({
    _id: "",
    name: "",
    document: "",
    plate: "",
    company: "",
    photo: undefined
  });

  useEffect(() => {
    if (props.location.deliveryman && props.location.deliveryman.photo) {
      let buff = Buffer.from(props.location.deliveryman.photo);
      setDeliveryman({ ...props.location.deliveryman, photo: buff.toString() });
    }
    else
      setDeliveryman(props.location.deliveryman);
  }, [props]);

  const voltar = () => {
    history.push('/');
  }

  return (
    <div className="container py-4">
      <button className="btn btn-primary" onClick={() => voltar()}>
        Voltar
      </button>
      <div className="start-job-container">
        {(deliveryman.photo) ? (
          <div className="react-html5-camera-photo">
            <img src={deliveryman.photo} alt="camera" />
          </div>
        ) : (
            <div className="text-center">
              <img src="/default_profile.jpg" alt="default" width="201" height="201" />
            </div>
          )}
      </div>
      <h1 className="display-4">Nome: {deliveryman.name}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Documento: {deliveryman.document}</li>
        <li className="list-group-item">Placa: {deliveryman.plate}</li>
        <li className="list-group-item">Empresa: {deliveryman.company}</li>
      </ul>
    </div>
  );
};

export default View;
