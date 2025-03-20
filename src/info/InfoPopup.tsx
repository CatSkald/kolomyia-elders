import "./InfoPopup.css";
import { InfoCircleFill, XCircleFill } from "react-bootstrap-icons";
import Popup from "reactjs-popup";
import { mapSources } from "../utils";
import { sources } from "../data/sources";
import { buttonSize } from "../themes";
import { useState } from "react";

const InfoPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="button" onClick={() => setOpen(!open)}>
        {open ? (
          <XCircleFill size={buttonSize} />
        ) : (
          <InfoCircleFill size={buttonSize} />
        )}
      </div>
      <Popup
        className="modal"
        open={open}
        onClose={() => setOpen(false)}
        closeOnDocumentClick
        overlayStyle={{ zIndex: 1000 }}
        modal
      >
        <span>
          Наш сайт створено з метою популяризації історії міста Коломиї.
          Інформація постійно доповнюється і допрацьовується.
        </span>
        <hr />
        <span style={{ fontWeight: "bold" }}>Використані джерела:</span>
        <ol style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          {mapSources(sources).map((item, index) => (
            <li key={index}>
              <span>{item.title}</span>
            </li>
          ))}
        </ol>
        <hr />
        <span>Ідея сайту навіяна проектом</span> “
        <a href="https://map.klym.uk/" rel="external" target="_blank">
          Вік&nbsp;будинків&nbsp;Станиславова
        </a>
        ”
      </Popup>
    </>
  );
};

export default InfoPopup;
