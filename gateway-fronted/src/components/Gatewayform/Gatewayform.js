import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Gatewayform.module.css";
import { Toast } from "bootstrap";
function Gatewayform() {
  const [unlinkedPeripheral, setUnlinkedPeripheral] = useState(null);
  const [gateway, setGateway] = useState(null);
  const [serial, setSerial] = useState(null);
  const [ipv4, setIpv4] = useState(null);
  const [name, setName] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const toastSuccessRef = useRef();
  const toastFailRef = useRef();
  const [gatewayErrors, setGatewayErrors] = useState(null);

  const handelChangesInForm = (e) => {
    if (e.target.id === "NAME") {
      setName(e.target.value);
    }
    if (e.target.id === "SERIAL") {
      setSerial(e.target.value);
    }
    if (e.target.id === "IPV4") {
      setIpv4(e.target.value);
    }
  };

  const fetchResource = (page) => {
    const fetchConfig = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:8090/gateway/detail/${id}`, fetchConfig)
      .then((res) => res.json())
      .then(
        (result) => {
          setGateway(result);
          setIpv4(result.ipv4);
          setSerial(result.serialNumber);
          setName(result.name);
        },
        (error) => {}
      );
  };

  const fetchPeripherals = () => {
    const fetchConfig = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:8090/peripheral/unlinked`, fetchConfig)
      .then((res) => res.json())
      .then(
        (result) => {
          setUnlinkedPeripheral(result);
        },
        (error) => {}
      );
  };

  useEffect(() => {
    if (id) {
      fetchResource();
      fetchPeripherals();
    }
  }, []);

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

  const generateRows = (source) => {
    let peripheralList =
      source === "LINKED" && gateway
        ? gateway.peripheral
        : source === "UNLINKED"
        ? unlinkedPeripheral
        : null;
    if (peripheralList)
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
                {source === "LINKED" ? (
                  <a
                    className="btn btn-sm btn-outline-secondary mx-4"
                    role={"button"}
                    onClick={() => unlinkPeripheral(peripheral)}
                  >
                    Remove
                  </a>
                ) : (
                  <a
                    className="btn btn-sm btn-outline-secondary mx-4"
                    role={"button"}
                    onClick={() => linkPeripheral(peripheral)}
                  >
                    Link
                  </a>
                )}
              </div>
            </td>
          </tr>
        );
      });
    return (
      <tr>
        <th scope="row">No</th>
        <td>Peripherical</td>
        <td>Asociated</td>
        <td>to</td>
        <td>this</td>
        <td>gateway</td>
      </tr>
    );
  };

  const linkPeripheral = (peripheral) => {
    const newUnlinked = unlinkedPeripheral.filter(
      (element) => element != peripheral
    );
    setUnlinkedPeripheral(newUnlinked);
    const fetchConfig = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(
      `http://localhost:8090/gateway/asociate_peripheral?gateway_id=${gateway.id}&peripheral_id=${peripheral.id}`,
      fetchConfig
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setGateway(result);
        },
        (error) => {}
      );
  };

  const unlinkPeripheral = (peripheral) => {
    const fetchConfig = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(
      `http://localhost:8090/gateway/unlink_peripheral?gateway_id=${gateway.id}&peripheral_id=${peripheral.id}`,
      fetchConfig
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setGateway(result);
        },
        (error) => {}
      )
      .finally(() => {
        fetchPeripherals();
      });
  };

  const submit = () => {
    let gatewaySave;
    if (id) {
      gatewaySave = {
        id: gateway.id,
        name: name,
        serialNumber: serial,
        ipv4: ipv4,
        peripheral: gateway.peripheral,
      };
    } else {
      gatewaySave = {
        name: name,
        serialNumber: serial,
        ipv4: ipv4,
      };
    }
    const fetchConfig = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gatewaySave),
    };
    fetch(`http://localhost:8090/gateway/save`, fetchConfig)
      .then((response) => {
        console.log(response.status);
        if (response.status !== 200) {
          const error = (response && response.message) || response.status;
          response
            .json()
            .then((res) => {
              setGatewayErrors(res);
            })
            .finally(() => {});
          return Promise.reject(error);
        }

        return response;
      })
      .then((res) => res.json())
      .then(
        (result) => {
          setGateway(result);
          setGatewayErrors(null);
          manageSuccessToast();
          navigate(`/gateway/form/${result.id}`);
          fetchPeripherals();
        },
        (error) => {
          manageFailToast();
        }
      );
  };

  const getUnlinkedPeripheralModal = () => {
    if (id)
      return (
        <div>
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#unlinkedPeripheral"
          >
            Add peripheral
          </button>

          <div
            className="modal fade"
            id="unlinkedPeripheral"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="Unlinked Peripheral"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="unlinkedPeripheralLabel">
                    Unlinked Peripheral
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
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
                    <tbody>{generateRows("UNLINKED")}</tbody>
                  </table>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
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
      <div className="col-8">
        <form>
          <div className="row g-3 col-sm-12  mb-4">
            <div className="col">
              <label htmlFor="NAME" className="form-label">
                NAME
              </label>
              <input
                id="NAME"
                type="text"
                className="form-control"
                required
                placeholder="NAME"
                aria-label="NAME"
                value={name ? name : ""}
                onChange={(e) => handelChangesInForm(e)}
              />
              <div
                className={
                  gatewayErrors && gatewayErrors.field === "NAME"
                    ? "invalid-feedback d-block"
                    : "d-none"
                }
              >
                {gatewayErrors && gatewayErrors.field === "NAME"
                  ? gatewayErrors.message
                  : ""}
              </div>
            </div>
            <div className="col">
              <label htmlFor="SERIAL" className="form-label">
                SERIAL
              </label>
              <input
                id="SERIAL"
                type="text"
                className="form-control"
                required
                placeholder="SERIAL"
                aria-label="SERIAL"
                value={serial ? serial : ""}
                onChange={(e) => handelChangesInForm(e)}
              />
              <div
                className={
                  gatewayErrors && gatewayErrors.field === "SERIAL_NUMBER"
                    ? "invalid-feedback d-block"
                    : "d-none"
                }
              >
                {gatewayErrors && gatewayErrors.field === "SERIAL_NUMBER"
                  ? gatewayErrors.message
                  : ""}
              </div>
            </div>
          </div>
          <div className="row g-3 col-sm-12  my-4">
            <div className="col">
              <label htmlFor="IPV4" className="form-label">
                IPV4
              </label>
              <input
                id="IPV4"
                type="text"
                className="form-control"
                placeholder="IPV4"
                aria-label="IPV4"
                value={ipv4 ? ipv4 : ""}
                onChange={(e) => handelChangesInForm(e)}
              />
              <div
                className={
                  gatewayErrors && gatewayErrors.field === "IPV4"
                    ? "invalid-feedback d-block"
                    : "d-none"
                }
              >
                {gatewayErrors && gatewayErrors.field === "IPV4"
                  ? gatewayErrors.message
                  : ""}
              </div>
            </div>
          </div>
          <div className="row g-3 col-sm-12 ">
            {getUnlinkedPeripheralModal()}
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
              <tbody>{generateRows("LINKED")}</tbody>
            </table>
          </div>
        </form>
      </div>
      <div className="col-3 my-4 pt-2 row">
        <div className="col-4">
          <button
            type="submit"
            className="btn btn-outline-success"
            onClick={() => submit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gatewayform;
