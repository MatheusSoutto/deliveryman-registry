import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Api from "../config";
import EditDeliveryman from "../common/DeliverymanForm";

const Edit = (props) => {
  let history = useHistory();
  const [deliveryman, setDeliveryman] = useState({
    _id: "",
    name: "",
    document: "",
    plate: "",
    company: "",
    visited: "",
    photo: undefined
  });

  useEffect(() => setDeliveryman(props.location.deliveryman), [props]);

  useEffect(() => {
    if (!deliveryman || deliveryman._id.length < 1) {
      let data = localStorage.getItem('deliveryman');
      if (data) {
        setDeliveryman(JSON.parse(data));
      }
    }
  }, [deliveryman]);

  const onSubmit = async (e, data) => {
    e.preventDefault();
    axios({
      method: 'patch',
      url: Api.endpoint + "/deliverymen/" + deliveryman._id,
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
        <h2 className="text-center mb-4">Editar Entregador</h2>
        <EditDeliveryman model={deliveryman} action={onSubmit} />
      </div>
    </div>
  );
};

export default Edit;
