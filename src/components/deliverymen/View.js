import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [deliveryman, setDeliveryman] = useState({
    name: "",
    document: "",
    plate: "",
    company: ""
  });
  const { id } = useParams();
  useEffect(() => {
    const loadDeliveryman = async () => {
      const res = await axios.get(`http://127.0.0.1:3003/deliverymen/${id}`);
      setDeliveryman(res.data);
    };
    loadDeliveryman();
  }, [id]);
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        Voltar
      </Link>
      <h1 className="display-4">Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Nome: {deliveryman.name}</li>
        <li className="list-group-item">Documento: {deliveryman.document}</li>
        <li className="list-group-item">Placa: {deliveryman.plate}</li>
        <li className="list-group-item">Empresa: {deliveryman.company}</li>
      </ul>
    </div>
  );
};

export default View;
