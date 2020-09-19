import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const Edit = () => {
  let history = useHistory();
  const { id } = useParams();
  const [deliveryman, setDeliveryman] = useState({
    name: "",
    document: "",
    plate: "",
    company: ""
  });

  const { name, document, plate, company } = deliveryman;
  const onInputChange = e => {
    setDeliveryman({ ...deliveryman, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const loadDeliveryman = async () => {
      const res = await axios.get(`http://127.0.0.1:3003/deliverymen/${id}`);
      setDeliveryman(res.data);
    };
    loadDeliveryman();
  }, [id]);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://127.0.0.1:3003/deliverymen/${id}`, deliveryman);
    history.push("/");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Editar Entregador</h2>
        
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nome"
              name="name"
              value={name}
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
      </div>
    </div>
  );
};

export default Edit;
