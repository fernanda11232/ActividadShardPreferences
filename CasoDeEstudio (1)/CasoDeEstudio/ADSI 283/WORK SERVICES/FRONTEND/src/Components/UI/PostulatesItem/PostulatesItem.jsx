import React, { useState, useEffect } from "react";
import { map } from "lodash";
import { ENV } from "../../../utils";
import { Confirm } from "semantic-ui-react";
import { Work } from "../../../api";
import { useAuth } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { Anclas } from "../Anclas/Anclas";

const workController = new Work()

export function PostulatesItem(props) {
  const navigate = useNavigate()
  const { postulate, users, path } = props;
  const { accessToken } = useAuth()

  const [ showConfirm, setShowConfirm ] = useState(false)
  const [ confirmMessage, setConfirmMessage ] = useState("")
  const [viewUser, setViewUser] = useState(null);

  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState)

  const onSelectionPostulate = async () => {
    try {
      await workController.updateWork(accessToken, path, {
        userPostulate: viewUser.email,
        status: false
      })
      alert(`${viewUser.firstname} ${viewUser.lastname} ha sido seleccionado`)
      navigate("/")
      onOpenCloseConfirm()
    } catch (error) {
      console.error(error);
    }
  }

  const openSelection = () => {
    setConfirmMessage(`Seleccionar usuario ${viewUser.email}`)
    onOpenCloseConfirm()
  }

  let x = map(users, (post) => {
    if (post.email === postulate.userPostulate) {
      return post;
    }
  });
  useEffect(() => {
    map(x, (y) => {
      if (y != null) {
        setViewUser(y);
      }
    });
  }, [x]);

  return (
      <>
      <div className="peoplePostulation">
        <img className="imgPerson" src={viewUser ? viewUser.avatar ? `${ENV.BASE_PATH}/${viewUser.avatar}` : "https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0" : ""} alt="" />
        <div>
            <p>{viewUser ? `Usuario: ${viewUser.firstname}` : ""}</p>
            <Anclas enlace={viewUser ? `/user/${viewUser._id}` : ""} textoAncla={viewUser ? `Email: ${viewUser.email}` : ""}/>
        </div>
        <button className="seleccionar" onClick={openSelection}>Seleccionar</button>
      </div>
          <Confirm className='confirmModal' open={showConfirm} onCancel={onOpenCloseConfirm} 
            onConfirm={onSelectionPostulate} 
            content={confirmMessage} size='mini' 
          />
      </>
  );
}
