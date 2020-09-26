import React from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Api from "../config";
import AddDeliveryman from "../common/DeliverymanForm";

const Add = () => {
  let history = useHistory();
  const deliveryman = {
    name: "",
    document: "",
    plate: "",
    company: "",
    photo: undefined
  };

  // Create a new Deliveryman
  const onSubmit = async (e, data) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: Api.endpoint + '/deliverymen',
      data: data,
      headers: {
        "content-type": "application/json",
        "authorization": "bearer " + localStorage.getItem('token')
      }
    }).catch(err => {
      console.error(err);
    });
    history.push("/");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Adicionar Entregador</h2>
        <AddDeliveryman model={deliveryman} action={onSubmit} />
      </div>
    </div>
  );
};

export default Add;
