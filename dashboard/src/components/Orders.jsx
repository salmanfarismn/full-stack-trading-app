import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("https://full-stack-trading-app-nyyt.onrender.com/allOrders").then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, []);
  return (
    <div className="orders">
      {orders && orders.length > 0 ? (
        <div className="order-table">
          <table>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Tot. Amount</th>
              <th>Mode</th>
            </tr>

            {orders.map((stock, index) => {
              const totalPrice = stock.qty * stock.price;

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{totalPrice}</td>
                  <td>{stock.mode}</td>
                </tr>
              );
            })}
          </table>
        </div>
      ) : (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
