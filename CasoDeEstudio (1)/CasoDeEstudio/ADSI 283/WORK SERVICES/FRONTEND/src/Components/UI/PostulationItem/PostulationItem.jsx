import React, { useState, useEffect } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { ENV } from "../../../utils";
import { Postulate, Work } from "../../../api";
import { useAuth } from "../../../hooks";
import { map } from "lodash";

const postulateController = new Postulate();
const workController = new Work()

export function PostulationItem(props) {
  const { work, onReload, postulate } = props;

  const [postul, setPostul] = useState(false);

  let x = map(postulate, (post) => {
    if (post.id_Work === work._id) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    setPostul(x.includes(true));
  }, [x]);

  const { accessToken } = useAuth();

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openPostulateConfirm = () => {
    setConfirmMessage(`¿Estas seguro que quieres cancelar tu postulacion?`);
    onOpenCloseConfirm();
  };

  const onDeletePostulation = async () => {
    try {
        map(postulate, async (post)=>{
            if(post.id_Work === work._id){
                await postulateController.deletePostulate(accessToken, post._id);
                work.postulates=Number(work.postulates)+1
                await workController.updateWork(accessToken, work._id, work)
            }
        })
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <>
          {postul ? (
              <>
            <div className="CartaT">
              <div className="work-item-info">
                <div className="work-image">
                  <img
                    className="imageWork"
                    src={
                      work.imageWork
                        ? `${ENV.BASE_PATH}/${work.imageWork}`
                        : "https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0"
                    }
                    alt=""
                  />
                </div>
                <div className="work-text">
                  <p>{work.name}</p>
                  <p>{work.description}</p>
                  <p>{work.date}</p>
                  <p>{work.address}</p>
                  <p>{work.price}</p>
                  <p>{work.postulates}</p>
                </div>
              </div>
              <div className="work-buttons">
                <Button onClick={openPostulateConfirm}>
                  Cancelar Postulacion
                </Button>
              </div>
          </div>
            </>
          ) : (
            <></>
          )}
        <Confirm
            className="confirmModal"
            open={showConfirm}
            onCancel={onOpenCloseConfirm}
            onConfirm={onDeletePostulation}
            content={confirmMessage}
            size="mini"
        />
    </>
  );
}
