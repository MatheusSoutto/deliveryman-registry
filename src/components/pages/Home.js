import dotenv from "dotenv";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Deliverymen from "../common/DeliverymenTable";

dotenv.config()

const Home = () => {
  const [deliverymen, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(process.env.API_URL + "/deliverymen");
    setUser(result.data.reverse());
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Cadastro de Entregador</h1>
        <Deliverymen  deliverymen={deliverymen} />
      </div>
    </div>
  );
};

export default Home;
