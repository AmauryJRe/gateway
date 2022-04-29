import React, { useState, useEffect } from "react";
import BarChar from "../chart/BarChar";
import styles from './Dashboard.module.css';

function Dashboard () {
  const [gatewayChart, setGatewayChart] = useState(null);
  const [periheralChart, setPeripheralChart] = useState(null);

  const fetchMetadata = () => {
    const fetchConfig = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:8090/peripheral/metadata`, fetchConfig)
      .then((res) => res.json())
      .then(
        (result) => {
          setPeripheralChart({
            label: "Peripheral",
            labels: result.labels, //[result.labels[0],result.labels[1]],
            dataset: result.dataset,
          });
        },
        (error) => {}
      );

    fetch(`http://localhost:8090/gateway/metadata`, fetchConfig)
      .then((res) => res.json())
      .then(
        (result) => {
          setGatewayChart({
            label: "Gateway",
            labels: result.labels, //[result.labels[0],result.labels[1]],
            dataset: result.dataset,
          });
        },
        (error) => {}
      );
  };
  useEffect(() => {
    fetchMetadata();
  }, []);
  return(
    <React.Fragment>
      <div className="p-4 row">
            {/* <div className="card-deck"> */}

            <div
              className="card text-center text-white mb-3 bg-card"
              style={{ maxWidth: "17rem", marginLeft: "1.5rem" }}
            >
              <div className="card-header">Gateway Count</div>
              <div className="card-body">
                <p
                  className="card-text-number"
                  style={{
                    fontSize: "4rem",
                    padding: "0",
                    fontWeight: "bold",
                  }}
                >
                  201
                </p>
              </div>
            </div>
            <div
              className="card text-center text-white mb-3 bg-card"
              style={{ maxWidth: "17rem", marginLeft: "1.5rem" }}
            >
              <div className="card-header">Peripheral Count</div>
              <div className="card-body">
                <p
                  className="card-text-number"
                  style={{
                    fontSize: "4rem",
                    padding: "0",
                    fontWeight: "bold",
                  }}
                >
                  201
                </p>
              </div>
            </div>
            <div
              className="card text-center text-white mb-3 bg-card"
              style={{ maxWidth: "17rem", marginLeft: "1.5rem" }}
            >
              <div className="card-header">Gateway not linked</div>
              <div className="card-body">
                <p
                  className="card-text-number"
                  style={{
                    fontSize: "4rem",
                    padding: "0",
                    fontWeight: "bold",
                  }}
                >
                  201
                </p>
              </div>
            </div>
            <div
              className="card text-center text-white mb-3 bg-card"
              style={{ maxWidth: "17rem", marginLeft: "1.5rem" }}
            >
              <div className="card-header">Paripherals not linked</div>
              <div className="card-body">
                <p
                  className="card-text-number"
                  style={{
                    fontSize: "4rem",
                    padding: "0",
                    fontWeight: "bold",
                  }}
                >
                  201
                </p>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="row" style={{paddingLeft:"2rem",paddingRight:"3.5rem"}}>
            <div className="col-sm-10 col-md-6 col-lg-6">
              {gatewayChart ? <BarChar chartdata={gatewayChart} /> : ""}
            </div>
            <div className="col-sm-10 col-md-6 col-lg-6">
              {periheralChart ? <BarChar chartdata={periheralChart} /> : ""}
            </div>
          </div>
    </React.Fragment>
  )
}

export default Dashboard;
