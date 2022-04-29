import React,{useState,useEffect} from "react";
import PropTypes from "prop-types";
import styles from "./Peripherical.module.css";
import Pagination from "../Pagination/Pagination";




function Peripheral (){
  const [periphericalList,setPeriphericalList]= useState(null);
  const [itemsPerPage,setItemsPerPage] = useState(10);
  const [currentPage,setCurrentPage] = useState(null);
  const [pagerSize,setPagerSize] = useState(10);
  const [totalPages,setTotalPages] = useState(null);

const fetchResource = (page) =>{
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
        setPeriphericalList(result.content);
        setCurrentPage(page);
        setTotalPages(result.totalPages);
      },
      (error) => {
        
      }
    );
}

useEffect(() => {
  fetchResource(0);
}, []);

const generateRows=()=>{
  return periphericalList.map(peripherical=>{
    return( <tr key={peripherical.id}>
      <th scope="row">{peripherical.id}</th>
      <td>{peripherical.uid}</td>
      <td>{peripherical.status}</td>
      <td>{peripherical.date}</td>
      <td>{peripherical.vendor}</td>
      <td><div className="d-flex justify-content-center">
        <a className="btn btn-sm btn-outline-danger mx-4" role={"button"}>Delete</a>
        <a className="btn btn-sm btn-outline-success mx-4" role={"button"}>Detail</a></div></td>
    </tr>)
  })
}
  return(<div className="p-4 mx-4 row">
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
      {periphericalList?generateRows():<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>}
    </tbody>
  </table>
  <Pagination currentPage={currentPage} totalPages={totalPages} pagerSize={pagerSize} periphericalList={periphericalList} fetchResource={fetchResource}/>
</div>
);
}

export default Peripheral;
