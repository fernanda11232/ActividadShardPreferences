import { Anclas } from "../../UI/Anclas/Anclas";
import { Barras } from "../../Iconos/Barras/Barras";
import { useAuth } from "../../../hooks";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { ENV } from "../../../utils";

export const MenuLateral = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const { logout } = useAuth();

  const onLogout = () => {
    if (!user) {
      alert("No hay usuario iniciado");
    } else {
      let message = window.confirm("Quieres cerrar sesion?");

      if (message) {
        logout();
        window.location.href = `${ENV.BASE_PATH}/auth?#`;
        // navigate("/");
      }
    }
  };
  const useAuth2 = useAuth();
  let roleUser = false;

  if (useAuth2.user == null) {
    console.log("No hay usuario");
  } else {
    const {
      user: { role },
    } = useAuth2;
    const isAdmin = role === "admin";
    roleUser = isAdmin;
  }

  return (
    <>
      <section className="MenuLateralEstatico">
        <div className="containerHome">
            <Anclas
            estilos="AnclaMenuHome"
            enlace="/"
            textoAncla={ 
                <Barras/>
            }
            />
        </div>

        <div className="ContainerAnclas">
          {!user ? (
            <>
              <Anclas
                estilos="AnclaMenu"
                enlace="/postulaciones"
                textoAncla="Postulaciones"
              />
              <Anclas 
                estilos="AnclaMenu" 
                enlace="/chat" 
                textoAncla="Chat" 
                />
              <Anclas
                estilos="AnclaMenu"
                enlace="/historialTrabajos"
                textoAncla="Historial"
              />
              <Anclas
                estilos="AnclaMenu"
                enlace="/favoritos"
                textoAncla="Favoritos"
              />
            </>
          ) : (
            <>
              {!roleUser ? (
                <>
                  <nav className="MenuAnclas">
                    <Anclas
                      estilos="AnclaMenu"
                      enlace="/postulaciones"
                      textoAncla="Postulaciones"
                    />
                    <Anclas
                      estilos="AnclaMenu"
                      enlace="/chat"
                      textoAncla="Chat"
                    />
                    <Anclas
                      estilos="AnclaMenu"
                      enlace="/historialTrabajos"
                      textoAncla="Historial"
                    />
                    <Anclas
                      estilos="AnclaMenu"
                      enlace="/favoritos"
                      textoAncla="Favoritos"
                    />
                  </nav>
                </>
              ) : (
                <>
                  <nav className="MenuAnclas">
                    <Anclas
                      estilos="AnclaMenu"
                      enlace="/administrarTrabajos"
                      textoAncla="Trabajos"
                    />
                    <Anclas
                      estilos="AnclaMenu"
                      enlace="/administrarUsuarios"
                      textoAncla="Usuarios"
                    />
                    <Anclas
                      estilos="AnclaMenu"
                      enlace="/reportes"
                      textoAncla="Reportes"
                    />
                  </nav>
                </>
              )}
            </>
          )}
        </div>

        {!user ? (
          <>
            <div id="NoSesion">
              <p>Registrate o inicia Sesión :)</p>
            </div>
          </>
        ) : (
          <>
            <div id="logoClose">
              <Button
                className="btnLogout"
                icon
                basic
                color="red"
                onClick={onLogout}
              >
                <Icon name="power off" />
                {<span className="material-symbols-outlined">logout</span>}
                <p></p>
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  );
};
