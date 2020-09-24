import React, { useState, useEffect } from "react";
import TakePhoto from "./../common/TakePhoto";
import 'react-html5-camera-photo/build/css/index.css';

const DeliverymanForm = ({ model, action }) => {
  const [step, setStep] = useState('0');
  const [deliveryman, setDeliveryman] = useState(model);
  useEffect(() => {
    if (model.photo) {
      let buff = Buffer.from(model.photo);
      setDeliveryman({...model, photo: buff.toString()});
    }
    else{
      setDeliveryman(model);
    }
  }, [model]);

  const { name, document, plate, company } = deliveryman;
  const fieldNames = {
    name: 'Nome',
    document: 'Documento',
    plate: 'Placa',
    company: 'Empresa',
    photo: 'Foto'
  }

  const onInputChange = e => {
    setDeliveryman({ ...deliveryman, [e.target.name]: e.target.value });
  };
  const setPhoto = (dataUri) => {
    setDeliveryman({ ...deliveryman, photo: dataUri });
    setStep('0');
  };
  const handleSubmit = e => {
    let valido = true;
    for (let key in fieldNames) {
      if (!deliveryman[key] || deliveryman === "") {
        debugger;
        e.preventDefault();
        valido = false;
        alert(`${fieldNames[key]} inválido(a)!`);
        break;
      }
    }
    if (valido) {
      action(e, deliveryman);
    }
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      {step && step === '0' ? (deliveryman && deliveryman.photo) ? (
        <div >
          <div className="react-html5-camera-photo">
            <img src={deliveryman.photo} alt="photoTaken" />
          </div>
          <div className="text-center" style={{ marginTop: 8 }}>
            <button className="btn btn-warning" onClick={() => setStep('1')}>
              Alterar Foto
          </button>
          </div>
          <br />
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={fieldNames.name}
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={fieldNames.document}
              name="document"
              value={document}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={fieldNames.plate}
              name="plate"
              value={plate}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder={fieldNames.company}
              name="company"
              value={company}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-success btn-block">Salvar</button>
        </div>
      ) : (
          <div className="text-center">
            <img src="/default_profile.jpg" alt="default" width="201" height="201" />
            <div style={{ marginTop: 8 }}>
              <button className="btn btn-warning" onClick={() => setStep('1')}>
                Tirar Foto
              </button>
            </div>
          </div>
        ) : (
          <TakePhoto dataUri={model.photo} setDataUri={setPhoto} />
        )}
    </form>
  );
};

export default DeliverymanForm;