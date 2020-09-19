import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DeliverymenTable = ({deliverymen}) => {

  const deleteDeliveryman = async id => {
    await axios.delete(`http://127.0.0.1:3003/users/${id}`);
    //loadDeliverymen();
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
              <Link className="btn btn-primary mr-2" to={`/users/${d.id}`}>
                Visualizar
              </Link>
              <Link
                className="btn btn-outline-primary mr-2"
                to={`/users/edit/${d.id}`}>
                Editar
              </Link>
              <Link
                className="btn btn-danger"
                to="/"
                onClick={() => deleteDeliveryman(d.id)}>
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