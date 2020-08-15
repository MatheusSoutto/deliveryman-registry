import React, { useState, useEffect } from "react";
import axios from "axios";
import Deliverymen from "../common/DeliverymenTable";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
  }, [users]);

  const onInputChange = e => {
    setId(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    loadUsers();
  };

  const loadUsers = async () => {
    const res = await axios.get("http://127.0.0.1:3003/users");
    let us = res.data.filter((u) => {
      if (id.trim().length > 0 && parseInt(id) === u.id) {
        return u;
      }
    })
    setUsers(us);
  };

  const deleteUser = async id => {
    await axios.delete(`http://127.0.0.1:3003/users/${id}`);
    setUser([]);
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Buscar Entregador</h1>
        {users !== undefined && users.length > 0 ? (
          <div className="user-found">
            <Deliverymen deliverymen={users} />
            <button
              className="btn btn-primary btn-block"
              onClick={() => setUsers([])}>
              Voltar
            </button>
          </div>
        ) : (
            <form onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Id..."
                  name="id"
                  value={id}
                  onChange={e => onInputChange(e)}
                />
              </div>
              <button className="btn btn-primary btn-block">Buscar</button>
            </form>
          )}
      </div>
    </div>
  );
};

export default Search;
