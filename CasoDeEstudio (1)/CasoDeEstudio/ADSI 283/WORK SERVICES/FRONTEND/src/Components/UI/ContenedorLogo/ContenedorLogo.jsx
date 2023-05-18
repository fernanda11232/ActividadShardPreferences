import React from "react";
import { Logo } from "../Logo/Logo";
import { Anclas } from "../Anclas/Anclas";

export const ContenedorLogo = () => {
  return (
    <div id="ContMenuLog">
      <button id="iconMenu" className="material-symbols-outlined">menu</button>

      <Anclas
        estilos="ContenedorLogo"
        textoAncla={<Logo />}
        root="/"
        enlace="/"
      />
    </div>
  );
};
