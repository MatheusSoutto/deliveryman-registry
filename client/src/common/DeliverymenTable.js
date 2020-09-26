import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Api from "../config";

const DeliverymenTable = ({ deliverymen, setDeliverymen }) => {

  const persistDeliveryman = async deliveryman => {
    if (deliveryman) {
      if (deliveryman.photo) {
        deliveryman.photo = Buffer.from(deliveryman.photo).toString();
      }
      localStorage.setItem('deliveryman', JSON.stringify(deliveryman));
    }
  }

  const deleteDeliveryman = async id => {
    axios({
      method: 'delete',
      url: Api.endpoint + "/deliverymen/" + id,
      headers: {
        "content-type": "application/json",
        "authorization": "bearer " + localStorage.getItem('token')
      }
    }).then(result => {
      if (result.status === 200) {
        setDeliverymen([]);
      }
    }).catch(err => {
      console.error(err);
    });
  };

  return (
    <table className="table border shadow">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nome</th>
          <th scope="col">Documento</th>
          <th scope="col">Placa</th>
          <th scope="col">Empresa</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {deliverymen.length > 0 && deliverymen.map((d, index) => (
          <tr key={`d-${index + 1}`}>
            <th scope="row">{index + 1}</th>
            <td>{d.name}</td>
            <td>{d.document}</td>
            <td>{d.plate}</td>
            <td>{d.company}</td>
            <td>
              <Link 
                className="btn btn-primary mr-2" 
                to={{ pathname: `/deliverymen/${d._id}`, deliveryman: d }}
                onClick={() => persistDeliveryman(d)} >
                Visualizar
              </Link>
              <Link
                className="btn btn-outline-primary mr-2"
                to={{ pathname: `/deliverymen/edit/${d._id}`, deliveryman: d }}
                onClick={() => persistDeliveryman(d)} >
                Editar
              </Link>
              <Link
                className="btn btn-danger"
                to="/"
                onClick={() => deleteDeliveryman(d._id)}>
                Remover
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DeliverymenTable;