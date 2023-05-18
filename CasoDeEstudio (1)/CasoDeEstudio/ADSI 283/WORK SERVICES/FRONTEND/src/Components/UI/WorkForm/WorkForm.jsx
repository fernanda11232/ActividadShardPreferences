import React, { useCallback } from 'react'
import { Form, Image } from "semantic-ui-react"
import { useFormik } from "formik"
import { useDropzone } from "react-dropzone"
import { Work } from '../../../api'
import { useAuth } from '../../../hooks'
import { ENV } from '../../../utils'
import { initialValues, validationSchema} from "../WorkValuesForm/WorkValuesForm"

const workController = new Work()

export function WorkForm(props) {
    const { close, onReload, work } = props
    const { accessToken } = useAuth()
    const { user } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(work),
        validationSchema: validationSchema(work),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          let horaTrabajos = Number(formValue.date.replace("T", " ").split("-").join("").split(":").join("").split(" ").join(""));
          let dateActuality = new Date()
          let horaActual = Number(dateActuality.toISOString().slice(0, 16).split("-").join("").split(":").join("").split("T").join(""))-500;
          try {
            if(!work){
              if(horaActual>=horaTrabajos){
                alert("Elige una fecha futura")
              }else{
                await workController.createWork(accessToken, formValue, user)
                onReload()
                close()
                window.location.reload(false);
              }
            }else{
              if(horaActual>=horaTrabajos){
                alert("Elige una fecha futura")
              }else{
                await workController.updateWork(accessToken, work._id, formValue)
                onReload()
                close()
                window.location.reload(false);
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
      })

      function closeForm(){
        onReload()
        close()
      }

      const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
        formik.setFieldValue("imageWork", URL.createObjectURL(file))
        formik.setFieldValue("fileAvatar", file)
      })
  
      const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
      })
  
      const getAvatar = () => {
        if(formik.values.fileAvatar) {
          return formik.values.imageWork
        } else if (formik.values.imageWork){
          return `${ENV.BASE_API}/${formik.values.imageWork}`
        }
        return "https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0"
      }

  return (
    <Form className='user-form' onSubmit={formik.handleSubmit}>
      <div className='user-form__avatar' {...getRootProps()}>
        <input {...getInputProps()}/>
        <Image avatar size='small' src={getAvatar()} />
      </div>

        <Form.Input name="name" placeholder="Trabajo" onChange={formik.handleChange}
          value={formik.values.name} error={formik.errors.name}
        />
        <Form.Input name="description" placeholder="Descripcion" onChange={formik.handleChange}
          value={formik.values.description} error={formik.errors.description}
        />
        <Form.Input name="date" type='datetime-local' placeholder="Fecha" onChange={formik.handleChange}
          value={String(formik.values.date)} error={formik.errors.date}
        />
        <Form.Input name="address" placeholder="Direccion" onChange={formik.handleChange}
          value={formik.values.address} error={formik.errors.address}
        />
        <Form.Input name="price" placeholder="Precio" onChange={formik.handleChange}
          value={formik.values.price} error={formik.errors.price}
        />
        <Form.Input name="postulates" placeholder="Cantidad de postulados" onChange={formik.handleChange}
          value={formik.values.postulates} error={formik.errors.postulates}
        />
      <div className='formDivButton'>
        <Form.Button type='submit' primary fluid onClick={closeForm} >
            Cancelar
        </Form.Button>
        <Form.Button type='submit' primary fluid loading={formik.isSubmitting} >
            Publicar
        </Form.Button>
      </div>
    </Form>
  )
}
