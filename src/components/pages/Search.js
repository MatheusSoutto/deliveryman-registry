import axios from "axios";
import React, { useState, useEffect } from "react";
import Deliverymen from "../common/DeliverymenTable";
import Api from "./../../config";

const Search = () => {
  const [deliverymen, setDeliverymen] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
  }, [deliverymen]);

  const onInputChange = e => {
    setName(e.target.value);
  };

  const handeSubmit = async e => {
    e.preventDefault();
    if (name && name.length > 2)
      loadDeliverymen();
    else
      alert('Pesquise ao menos 3 letras');
  }

  const loadDeliverymen = async () => {
    axios({
      method: 'get',
      url: Api.endpoint + "/deliverymen/name/" + name,
      headers: {
        "content-type": "application/json",
        "authorization": "bearer " + localStorage.getItem('token')
      }
    }).then(result => {
      if (result.data.result && result.data.result.length > 0)
        setDeliverymen(result.data.result);
      else
        alert('Entregador não encontrado');
    }).catch(err => {
      console.error(err);
    });
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Buscar Entregador</h1>
        {deliverymen !== undefined && deliverymen.length > 0 ? (
          <div className="deliveryman-found">
            <Deliverymen deliverymen={deliverymen} setDeliverymen={setDeliverymen} />
            <button
              className="btn btn-primary btn-block"
              onClick={() => setDeliverymen([])}>
              Voltar
            </button>
          </div>
        ) : (
            <form onSubmit={e => handeSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Nome..."
                  name="name"
                  value={name}
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
