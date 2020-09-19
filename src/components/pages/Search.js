import React, { useState, useEffect } from "react";
import axios from "axios";
import Deliverymen from "../common/DeliverymenTable";

const Search = () => {
  const [deliverymen, setDeliverymen] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
  }, [deliverymen]);

  const onInputChange = e => {
    setId(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    loadDeliverymen();
  };

  const loadDeliverymen = async () => {
    const res = await axios.get("http://127.0.0.1:3003/deliverymen");
    let result = res.data.filter((u) => {
      if (id.trim().length > 0 && parseInt(id) === u.id) {
        return u;
      }
    })
    setDeliverymen(result);
  };

  const deleteDeliveryman = async id => {
    await axios.delete(`http://127.0.0.1:3003/deliverymen/${id}`);
    //setDeliveryman([]);
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Buscar Entregador</h1>
        {deliverymen !== undefined && deliverymen.length > 0 ? (
          <div className="deliveryman-found">
            <Deliverymen deliverymen={deliverymen} />
            <button
              className="btn btn-primary btn-block"
              onClick={() => setDeliverymen([])}>
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
