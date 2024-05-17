import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from "./App.tsx";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // bootstrap icons 
import './inApp.css'; // Import our own CSS - Should be imported AFTER bootstrap CSS

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);