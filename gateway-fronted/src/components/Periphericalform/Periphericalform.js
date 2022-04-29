import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Periphericalform.module.css";
import { Toast } from "bootstrap";

function Periphericalform(prop) {
  // const [online,setOnline] = useEffect(null);
  const [unlinkedPeripheral, setUnlinkedPeripheral] = useState(null);
  const [peripheral,setPeripheral] = useState(null);
  const [gateway, setGateway] = useState(null);
  const [pripheralError,setPeripheralError] = useState(null);
  const [uid, setUid] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const toastSuccessRef = useRef();
  const toastFailRef = useRef();
  const {id} = useParams();
  
const generateRows = () => {
  if(id && gateway)
      return (
        <tr key={gateway.id}>
          <th scope="row">{gateway.id}</th>
          <td>{gateway.serialNumber}</td>
          <td>{gateway.name}</td>
          <td>{gateway.ipv4}</td>
          <td>{gateway.peripheral.length}</td>
          <td>
            <div className="d-flex justify-content-center">
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
    return(
      <tr>
        <th>No</th>
        <td>gateway</td>
        <td>Asociated</td>
        <td>to</td>
        <td>this</td>
        <td>Peripheral</td>
      </tr>
    );
  };

  const fetchResource = (page) =>{
    const fetchConfig = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(
      `http://localhost:8090/pripheral/detail/${id}`,
      fetchConfig
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setPeripheral(result);
        },
        (error) => {
          
        }
      );
  }

  useEffect(() => {
    if(id){
      fetchResource();
    }
  }, []);
  
  const submit = () => {
    console.log("lllllllll");
    let peripheralSave;
    if (id) {
      peripheralSave = {
        id: peripheral.id,
        uid: uid,
        vendor: vendor,
        status:status
      };
    } else {
      peripheralSave = {
        uid: uid,
        vendor: vendor,
        status:status
      };
    }
    const fetchConfig = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(peripheralSave),
    };
    fetch(`http://localhost:8090/peripheral/save`, fetchConfig)
      .then((response) => {
        console.log(response.status);
        if (response.status !== 200) {
          const error = (response && response.message) || response.status;
          response
            .json()
            .then((res) => {
              setPeripheralError(res);
              console.log(res);
              console.log(peripheralSave);
            })
            .finally(() => {});
          return Promise.reject(error);
          }
        return response;
      })
      .then((res) => res.json())
      .then(
        (result) => {
          setPeripheral(result);
          setPeripheralError(null);
          manageSuccessToast();
          navigate(`/peripheral/form/${result.id}`);
          fetchGateway();
        },
        (error) => {
          manageFailToast();
        }
      );
  };

  const fetchGateway = () =>{
    console.log("asdass");
  }

  const manageSuccessToast = () => {
    let myToast = toastSuccessRef.current;
    let tInstance = Toast.getInstance(myToast);

    if (!tInstance) {
      tInstance = new Toast(myToast, { delay: 3000 });
      tInstance.hide();
    }
    tInstance.show();
  };

  const manageFailToast = () => {
    let myToast = toastFailRef.current;
    let tInstance = Toast.getInstance(myToast);

    if (!tInstance) {
      tInstance = new Toast(myToast, { delay: 3000 });
      tInstance.hide();
    }
    tInstance.show();
  };

  const handelChangesInForm = (e) => {
    if (e.target.id === "UID") {
      setUid(e.target.value);
    }
    if (e.target.id === "DATE") {
      setDate(e.target.value);
    }
    if (e.target.id === "STATUS") {
      setStatus(e.target.value);
    }
    if (e.target.id === "VENDOR") {
      setVendor(e.target.value);
    }
  };

  return (
    <div className="p-4 row">
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <div className="toast-container position-absolute top-0 end-0 p-3">
          <div
            className="toast align-items-center text-white border-0 bg-custom"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            ref={toastSuccessRef}
          >
            <div className="toast-body">Gateway Saved</div>
          </div>
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <div className="toast-container position-absolute top-0 end-0 p-3">
          <div
            className="toast align-items-center text-white border-0 bg-danger"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            ref={toastFailRef}
          >
            <div className="toast-body">Failed fields contain errors</div>
          </div>
        </div>
      </div>
      <form>
        <div className="row g-3 col-sm-12 col-lg-6 offset-lg-3 my-4">
          
          <div className="col">
            <label htmlFor="UID" className="form-label">
              UID
            </label>
            <input
              id="UID"
              type="text"
              className="form-control"
              placeholder="UID"
              aria-label="UID"
              value={uid ? uid : ""}
              onChange={(e) => handelChangesInForm(e)}
            />
             <div
                className={
                  pripheralError && pripheralError.field === "UID"
                    ? "invalid-feedback d-block"
                    : "d-none"
                }
              >
                {pripheralError && pripheralError.field === "UID"
                  ? pripheralError.message
                  : ""}
              </div>
          </div>
          <div className="col">
            <label htmlFor="DATE" className="form-label">
              DATE
            </label>
            <input
              id="DATE"
              type="text"
              className="form-control"
              placeholder="DATE"
              aria-label="DATE"
              value={date ? date : ""}
              onChange={(e) => handelChangesInForm(e)}
              disabled
            />
          </div>
        </div>
        <div className="row g-3 col-sm-12 col-lg-6 offset-lg-3 my-4">
          <div className="col">
            <label htmlFor="STATUS" className="form-label">
              STATUS
            </label>
            <select id="STATUS" className="form-select" onChange={(e) => handelChangesInForm(e)}>
              <option value={"INCORRECT"}>
                Choose...
              </option>
              <option value={"ONLINE"}>ONLINE</option>
              <option value={"OFFLINE"}>OFFLINE</option>
            </select>
            <div
                className={
                  pripheralError && pripheralError.field === "STATUS"
                    ? "invalid-feedback d-block"
                    : "d-none"
                }
              >
                {pripheralError && pripheralError.field === "STATUS"
                  ? pripheralError.message
                  : ""}
              </div>
          </div>
          <div className="col">
            <label htmlFor="VENDOR" className="form-label">
              VENDOR
            </label>
            <input
              id="VENDOR"
              type="text"
              className="form-control"
              placeholder="VENDOR"
              aria-label="VENDOR"
              value={vendor ? vendor : ""}
              onChange={(e) => handelChangesInForm(e)}
            />
             <div
                className={
                  pripheralError && pripheralError.field === "VENDOR"
                    ? "invalid-feedback d-block"
                    : "d-none"
                }
              >
                {pripheralError && pripheralError.field === "VENDOR"
                  ? pripheralError.message
                  : ""}
              </div>
          </div>
        </div>
        {/* <div className="row g-3 col-sm-12 col-lg-6 offset-lg-3 my-4">
          <table className="table">
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
            <tbody>{generateRows()}</tbody>
          </table>
        </div> */}
      </form>
      <div className="col-12">
      <button
            type="submit"
            className="btn btn-outline-success"
            onClick={() => submit()}
          >
            Submit
          </button>
      </div>
    </div>
  );
}

export default Periphericalform;
