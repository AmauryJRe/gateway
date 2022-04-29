import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Peripherical.module.css";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Peripheral() {
  const [peripheralList, setPeripheralList] = useState(null);
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
      `http://localhost:8090/peripheral/list?size=${itemsPerPage}&page=${page}`,
      fetchConfig
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setPeripheralList(result.content);
          setCurrentPage(page);
          setTotalPages(result.totalPages);
        },
        (error) => {}
      );
  };

  useEffect(() => {
    fetchResource(0);
  }, []);

  const deletePeripheral = (peripheral_id) => {
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    axios
      .delete(`http://localhost:8090/peripheral/delete/${peripheral_id}`)
      .then(() => fetchResource(currentPage));
  };

  const generateRows = () => {
    return peripheralList.map((peripheral) => {
      return (
        <tr key={peripheral.id}>
          <th scope="row">{peripheral.id}</th>
          <td>{peripheral.uid}</td>
          <td>{peripheral.status}</td>
          <td>{peripheral.date}</td>
          <td>{peripheral.vendor}</td>
          <td>
            <div className="d-flex justify-content-center">
              <a
                className="btn btn-sm btn-outline-danger mx-4"
                role={"button"}
                onClick={() => deletePeripheral(peripheral.id)}
              >
                Delete
              </a>
              <a
                className="btn btn-sm btn-outline-success mx-4"
                role={"button"}
                onClick={()=>navigate(`/peripheral/form/${peripheral.id}`)}
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
    <div className="p-4 mx-4 row">
      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">UID</th>
            <th scope="col">STATUS</th>
            <th scope="col">DATE</th>
            <th scope="col">VENDOR</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {peripheralList ? (
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
        peripheralList={peripheralList}
        fetchResource={fetchResource}
      />
    </div>
  );
}

export default Peripheral;
