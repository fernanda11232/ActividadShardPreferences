import React, { useState, useEffect } from "react";
import { HeaderHome } from "../../Layouts/HeaderHome/HeaderHome";
import { MessageWorks } from "../../UI/MessageWorks/MessageWorks";
import { MenuLateral } from "../../Layouts/MenuLateral/MenuLateral";
import { ListChats } from "../../UI/ListChats/ListChats";
import { Work, Chat as ChatMessage } from "../../../api";
import { useAuth } from "../../../hooks";
import { ENV } from "../../../utils";
import LogoWorkServices2 from "../../../img/LogoWorkServices2.png";
import io from "socket.io-client";

// const socket = io("https://work-services.onrender.com");
const socket = io(`${ENV.BASE_API}`);

const chatController = new ChatMessage();
const workController = new Work();

export const Chat = () => {
  const { accessToken, user } = useAuth();
  const [reload, setReload] = useState(false);
  const onReload = () => setReload((prevState) => !prevState);

  const [works, setWorks] = useState(null);
  const [storedMessages, setStoredMessages] = useState(null);
  const [firstTime, setfirstTime] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [idWork, setIdWork] = useState("");
  const [nameWork, setNameWork] = useState("");

  function click(listen, workName) {
    getDates(listen, workName);
  }

  async function getDates(listen, workName) {
    if(listen === undefined){
      listen = idWork
    }
    setIdWork(listen);
    setNameWork(workName);
    if (!firstTime) {
      setStoredMessages(null);
      const response = await chatController.getMessages(accessToken, listen);
      setStoredMessages(response);
    }
    setfirstTime(false);
    setMessages([]);
  }

  useEffect(() => {
    const receivedMessage = (message) => {
      if (message.work === idWork) {
        // Comprobar si el navegador soporta notificaciones
        if (!("Notification" in window)) {
          alert("Este navegador no soporta notificaciones.");
        } else if (Notification.permission === "granted") {
          // Si el usuario ya dio permiso, mostrar la notificación
          let notification = new Notification(
            `Nuevo mensaje ${user.firstname}`,
            {
              body: `${message.from}: ${message.body}`,
              icon: LogoWorkServices2,
            }
          );
          notification.addEventListener("click", () => {
            window.location.href = `${ENV.BASE_PATH}/chat`;
          });
          setTimeout(() => notification.close(), 4 * 1000);
          console.log(notification);
        } else if (Notification.permission !== "denied") {
          // Si el usuario aún no ha decidido, solicitar permiso
          Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
              let notification = new Notification(
                `Nuevo mensaje ${user.firstname}`,
                {
                  body: `${message.from}: ${message.body}`,
                  icon: LogoWorkServices2,
                }
              );
              notification.addEventListener("click", () => {
                window.location.href = `${ENV.BASE_PATH}/chat`;
              });
              setTimeout(() => notification.close(), 4 * 1000);
            }
          });
        } else {
          console.log("no funciona");
        }
        setMessages([...messages, message]);
      }
    };
    socket.on("message", receivedMessage);

    const scroll = document.getElementById("containerChatT");
    scroll.scrollTop = scroll.scrollHeight;

    return () => {
      socket.off("message", receivedMessage);
    };
  }, [messages, idWork, storedMessages]);

  const Send = async () => {
    if (message !== "") {
      let newDate = String(new Date());
      let newHour = `${newDate[16]}${newDate[17]}:${newDate[19]}${newDate[20]}`;

      socket.emit("message", message, user.firstname, idWork, newHour);

      setMessage("");
      setMessages([]);

      if (idWork !== "") {
        await chatController.saveMessage(
          accessToken,
          user,
          idWork,
          message,
          newHour
        );
      }

      setStoredMessages(null);
      const response = await chatController.getMessages(accessToken, idWork);
      setStoredMessages(response);

      const scroll = document.getElementById("containerChatT");
      scroll.scrollTop = scroll.scrollHeight;
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    Send();
  };

  const sendMessageEnter = async (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      Send();
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setWorks(null);
        const response = await workController.getWorks(false);
        setWorks(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  return (
    <div id="Chat">
      <HeaderHome></HeaderHome>
      <div className="containerChat">
        <div className="containMenuLateral">
          <MenuLateral />
        </div>
        <div className="worksChat">
          <ListChats
            click={click}
            works={works}
            reload={reload}
            onReload={onReload}
          />
        </div>

        <div id="PrincipalMessages">
          <div id="messageChat">
            <div className="containerTitle">
              {idWork === "" ? (
                ""
              ) : (
                <div className="titleChat">
                  <p className="titleMessage">{`Bienvenido al chat ${nameWork} ahora puedes enviar mensajes`}</p>
                </div>
              )}
            </div>

            <div id="containerChatT">
              {storedMessages == null
                ? ""
                : storedMessages.map((message, index) => {
                    return (
                      <MessageWorks
                        key={index}
                        content={
                          message.nameUser === user.firstname
                            ? `Yo: ${message.message}`
                            : `${message.nameUser}: ${message.message}`
                        }
                        style={
                          message.nameUser === user.firstname
                            ? "messageWorks messageDefault"
                            : "messageWorks2 messageDefault"
                        }
                        dateTime={message.date}
                        idMessage={message._id}
                        statusMessage={click}
                      />
                    );
                  })}
              {messages === []
                ? ""
                : messages.map((message, index) => {
                    return (
                      <MessageWorks
                        key={index}
                        content={`${message.from}: ${message.body}`}
                        style={
                          message.from === "Yo"
                            ? "messageWorks messageDefault"
                            : "messageWorks2 messageDefault"
                        }
                        dateTime={message.hour}
                        idMessage={message._id}
                        statusMessage={click}
                      />
                    );
                  })}
            </div>
          </div>
          <div id="containForm">
            {idWork === "" ? (
              ""
            ) : (
              <form className="sendMessage" onSubmit={sendMessage}>
                <textarea
                  onKeyDown={sendMessageEnter}
                  className="inputMessage"
                  type="text-area"
                  placeholder="Envia un mensaje"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <button className="buttonChat">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
