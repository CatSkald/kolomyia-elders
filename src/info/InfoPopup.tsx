import "./InfoPopup.css";

import { InfoCircleFill, XCircleFill } from "react-bootstrap-icons";
import Popup from "reactjs-popup";
import { mappedSources } from "../utils";
import { buttonSize } from "../themes";
import { ReactNode, useState } from "react";

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
        {
          ((close: () => void) => (
            <>
              <div className="button close" onClick={close}>
                <XCircleFill size={buttonSize} />
              </div>
              <span>
                Наш сайт створено з метою популяризації історії міста Коломиї.
                Інформація постійно доповнюється і допрацьовується. Оновлено у{" "}
                <b>липні&nbsp;2025</b>.
              </span>
              <hr />
              <span style={{ fontWeight: "bold" }}>Використані джерела:</span>
              <ol style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                {mappedSources.map((item, index) => (
                  <li key={index}>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ol>
              <hr />
              <span>Ідея сайту навіяна проектами</span> “
              <a href="https://map.klym.uk/" rel="external" target="_blank">
                Вік&nbsp;будинків&nbsp;Станиславова
              </a>
              ” та “
              <a
                href="https://kolobramy.com.ua/"
                rel="external"
                target="_blank"
              >
                коло&nbsp;брами
              </a>
              ”.
            </>
          )) as unknown as ReactNode
        }
      </Popup>
    </>
  );
};

export default InfoPopup;
