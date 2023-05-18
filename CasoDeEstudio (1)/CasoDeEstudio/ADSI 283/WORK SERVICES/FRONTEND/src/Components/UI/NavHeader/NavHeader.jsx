import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Anclas } from "../Anclas/Anclas";
import { useAuth } from "../../../hooks";
import { Button } from "semantic-ui-react";
import { BasicModal } from "../../UI/BasicModal/BasicModal";
import { WorkForm } from "../../UI/WorkForm/WorkForm";

export const NavHeader = () => {
  const [ showModal, setShowModal ] = useState("modalProfile2")
  const [ reload, setReload ] = useState(false)

  const navigate = useNavigate();
  const { user } = useAuth();
  const onOpenCloseModal = () => {
    navigate("/");
    setShowModal(showModal === "modalProfile2" ? "modalProfile3" : "modalProfile2");
  };
  const onReload = () => setReload((prevState) => !prevState);
  return (
    <div id="NavHeader">
      <div id="containers">
        {!user ? (
          <>
            <div id="logos">
              <Anclas
                estilos="Ancla"
                textoAncla={
                  <span className="material-symbols-outlined" id="iconHeader">
                    person_add
                  </span>
                }
                enlace="/auth"
              />
              <Anclas estilos="Ancla" enlace="/auth" textoAncla="Registro"/>
            </div>
            <div id="logos">
              <Anclas
                estilos="Ancla"
                textoAncla={
                  <span className="material-symbols-outlined" id="iconHeader">
                    person
                  </span>
                }
                enlace="/auth"
              />
              <Anclas estilos="Ancla" enlace="/auth" textoAncla="Login" />
            </div>
          </>
        ) : (
          <>
            <div id="logos">
              <Button
                className="addWork"
                primary
                onClick={onOpenCloseModal}
                title="Crear Trabajo"
              >
                <span className="material-symbols-outlined" id="iconHeader">medical_services</span>
              </Button>
            </div>

            <div id="logos">
              {/* Notificaciones */}
              <Anclas
                estilos="Ancla"
                textoAncla={
                  <span className="material-symbols-outlined" id="iconHeader">
                    notifications
                  </span>
                }
                enlace="/notificaciones"
                title="Notificaciones"
              />
            </div>

            <div id="logos">
              {/* Usuario */}
              <Anclas
                estilos="Ancla"
                textoAncla={
                  <span className="material-symbols-outlined" id="iconHeader">
                    account_circle
                  </span>
                }
                enlace="/profile"
                title="Perfil"
              />
            </div>
          </>
        )}
      </div>
      <BasicModal show={showModal} title="Publicar trabajo">
        <WorkForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </div>
  );
};
