import React, { useState, useEffect } from "react";
import axios from "axios";
import Deliverymen from "../common/DeliverymenTable";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://127.0.0.1:3003/users");
    setUser(result.data.reverse());
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Cadastro de Entregador</h1>
        <Deliverymen  deliverymen={users} />
      </div>
    </div>
  );
};

export default Home;
