import React, { useState, useMemo } from "react";
import api from "../../services/api";

import "./styles.css";
import camera from "../../assets/camera.svg";

export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [price, setPrice] = useState("");
  const [techs, setTechs] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();
    
    const data = new FormData();
    const user_id = localStorage.getItem("user");

    data.append("thumbnail", thumbnail);
    data.append("company", company);
    data.append("techs", techs);
    data.append("price", price);

    await api.post("/spots", data, {
      headers: { user_id }
    });

    history.push("/dashboard");
  }


  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input
          type="file"
          onChange={({ target }) => setThumbnail(target.files[0])}
        ></input>
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">Empresa</label>
      <input
        id="company"
        placeholder="Sua empresa inscrível"
        onChange={({ target }) => setCompany(target.value)}
      />

      <label htmlFor="techs">
        TECNOLOGIAS * <span>(separadas por vírgula)</span>
      </label>
      <input
        id="techs"
        placeholder="Quais tecnologias usam?"
        onChange={({ target }) => setTechs(target.value)}
      />

      <label htmlFor="price">
        VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span>
      </label>
      <input
        id="price"
        placeholder="Sua empresa inscrível"
        onChange={({ target }) => setPrice(target.value)}
      />
      <button className="btn">Cadastrar</button>
    </form>
  );
}
