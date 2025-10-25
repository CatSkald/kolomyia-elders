import "./InfoPopup.css";

import { XCircleFill } from "react-bootstrap-icons";
import Popup from "reactjs-popup";
import { buttonSize } from "../themes";
import { ReactNode } from "react";

const InfoPopup = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <Popup
      className="modal"
      open={open}
      onClose={onClose}
      closeOnDocumentClick
      overlayStyle={{ zIndex: 1120 }}
      modal
    >
      {
        ((close: () => void) => (
          <>
            <div role="button" className="close" onClick={close}>
              <XCircleFill size={buttonSize} />
            </div>
            {children}
          </>
        )) as unknown as ReactNode
      }
    </Popup>
  );
};

export default InfoPopup;
