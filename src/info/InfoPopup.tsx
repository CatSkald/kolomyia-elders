import "./InfoPopup.css";
import { InfoCircleFill } from "react-bootstrap-icons";
import Popup from "reactjs-popup";
import { mapSources } from "../utils";
import { sources } from "../data/sources";
import { buttonSize } from "../style-utils";

const InfoPopup = () => (
  <Popup
    trigger={
      <div className="button">
        <InfoCircleFill size={buttonSize} />
      </div>
    }
    position="bottom right"
    className="modal"
    arrow={false}
  >
    <span style={{ fontWeight: "bold" }}>Використані джерела:</span>
    <ul style={{ marginTop: "0.5rem" }}>
      {mapSources(sources).map((item, index) => (
        <li key={index}>
          <span>{item.title}</span>
        </li>
      ))}
    </ul>
    <hr />
    <span style={{ fontStyle: "italic" }}>Ідея сайту навіяна проектом</span> “
    <a href="https://map.klym.uk/" rel="external" target="_blank">
      Вік будинків Станиславова
    </a>
    ”
  </Popup>
);

export default InfoPopup;
