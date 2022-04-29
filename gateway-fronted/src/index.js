import React from 'react';
import { createRoot } from "react-dom/client";
import "jquery";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<App/>);