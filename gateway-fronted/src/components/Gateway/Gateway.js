import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Gateway.module.css";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Gateway() {
  const [gatewayList, setGatewayList] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(null);
  const [pagerSize, setPagerSize] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const navigate = useNavigate();

  const fetchResource = (page) => {
    const fetchConfig = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(
      `http://localhost:8090/gateway/list?size=${itemsPerPage}&page=${page}`,
      fetchConfig
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setGatewayList(result.content);
          setCurrentPage(page);
          setTotalPages(result.totalPages);
        },
        (error) => {}
      );
  };

  const deleteGateway=(gateway_id)=>{
      const fetchConfig = {
        method: 'DELETE' ,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      axios.delete(`http://localhost:8090/gateway/delete/${gateway_id}`)
      .then(() => fetchResource(currentPage));
  };

  useEffect(() => {
    fetchResource(0);
  }, []);

  const generateRows = () => {
    return gatewayList.map((gateway) => {
      return (
        <tr key={gateway.id}>
          <th scope="row">{gateway.id}</th>
          <td>{gateway.serialNumber}</td>
          <td>{gateway.name}</td>
          <td>{gateway.ipv4}</td>
          <td>{gateway.peripheral.length}</td>
          <td>
            <div className="d-flex justify-content-center">
              <a className="btn btn-sm btn-outline-danger mx-4" role={"button"} onClick={()=>deleteGateway(gateway.id)}>
                Delete
              </a>
              <a
                className="btn btn-sm btn-outline-success mx-4"
                role={"button"}
                onClick={()=>navigate(`/gateway/form/${gateway.id}`)}
              >
                Detail
              </a>
            </div>
          </td>
        </tr>
      );
    });
  };
  
  return (
    <React.Fragment>
    
    <div className="p-4 mx-4 row">
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">SERIAL</th>
            <th scope="col">NAME</th>
            <th scope="col">IPV4</th>
            <th scope="col">PERIPHERAL</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {gatewayList ? (
            generateRows()
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pagerSize={pagerSize}
        gatewayList={gatewayList}
        fetchResource={fetchResource}
      />
    </div>  
    </React.Fragment>
  );
}

export default Gateway;
