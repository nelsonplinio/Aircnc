import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";
import api from "../../services/api";

import "./styles.css";

export default function Dashboard({ history }) {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem("user");
  const socket = useMemo(
    () =>
      socketio("http://localhost:3333", {
        query: { user_id }
      }),
    [user_id]
  );

  useEffect(() => {
    socket.on("booking_request", data => {
      console.log(data);
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    async function loadSpots() {
      const user_id = localStorage.getItem("user");

      const response = await api.get("/dashboard", {
        headers: { user_id }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  async function handleAcceptlBooking({ _id: booking_id }) {
    await api.post(`/booking/${booking_id}/approvals`);
    setRequests(requests.filter(booking => booking._id !== booking_id));
  }

  async function handleRejectBooking({_id: booking_id}) {
    await api.post(`/booking/${booking_id}/rejections`);
    setRequests(requests.filter(booking => booking._id !== booking_id));
  }

  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request.user._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva
              em <strong>{request.spot.company}</strong> para da data{" "}
              <strong>{request.date}</strong>
            </p>
            <button
              className="accept"
              onClick={() => handleAcceptlBooking(request)}
            >
              Aceitar
            </button>
            <button
              className="reject"
              onClick={() => handleRejectBooking(request)}
            >
              Rejeitar
            </button>
          </li>
        ))}
      </ul>

      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$ ${spot.price}/dia` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
  );
}
