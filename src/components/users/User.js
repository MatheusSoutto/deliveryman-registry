import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    name: "",
    document: "",
    plate: "",
    company: ""
  });
  const { id } = useParams();
  useEffect(() => {
    const loadUser = async () => {
      const res = await axios.get(`http://127.0.0.1:3003/users/${id}`);
      setUser(res.data);
    };
    loadUser();
  }, [id]);
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        Voltar
      </Link>
      <h1 className="display-4">Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Nome: {user.name}</li>
        <li className="list-group-item">Documento: {user.document}</li>
        <li className="list-group-item">Placa: {user.plate}</li>
        <li className="list-group-item">Empresa: {user.company}</li>
      </ul>
    </div>
  );
};

export default User;
