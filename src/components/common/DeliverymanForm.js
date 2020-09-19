import React, {useState} from "react";

const DeliverymanForm = ({ user1, action }) => {
  const [user, setDeliveryman] = useState(user1);

  const { name, document, plate, company } = user;
  const onInputChange = e => {
    setDeliveryman({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={e => action(e)}>
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Nome"
          name="name"
          value={user1.name}
          onChange={e => onInputChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Documento"
          name="document"
          value={document}
          onChange={e => onInputChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Placa"
          name="plate"
          value={plate}
          onChange={e => onInputChange(e)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Empresa"
          name="company"
          value={company}
          onChange={e => onInputChange(e)}
        />
      </div>
      <button className="btn btn-warning btn-block">Salvar</button>
    </form>
  );
};

export default DeliverymanForm;