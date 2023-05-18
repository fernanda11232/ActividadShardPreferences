import React, { useCallback } from 'react'
import { Form, Image } from "semantic-ui-react"
import { initialValues, validationSchema } from "../ValuesForm/ValuesForm"
import { useFormik } from "formik"
import { useDropzone } from "react-dropzone"
import { User } from '../../../api'
import { useAuth } from '../../../hooks'
import { ENV } from '../../../utils'

const userController = new User()

export function UserForm(props) {
    const { close, onReload, user } = props
    const { accessToken } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(user),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          try {
            const response = await userController.updateUser(accessToken, user._id, formValue)
            console.log(response);
            onReload()
            close()
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
        formik.setFieldValue("avatar", URL.createObjectURL(file))
        formik.setFieldValue("fileAvatar", file)
      })
  
      const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png",
        onDrop,
      })
  
      const getAvatar = () => {
        if(formik.values.fileAvatar) {
          return formik.values.avatar
        } else if (formik.values.avatar){
          return `${ENV.BASE_PATH}/${formik.values.avatar}`
        }
        return "https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0"
      }

  return (
    <Form className='user-form' onSubmit={formik.handleSubmit}>
      <div className='user-form__avatar' {...getRootProps()}>
        <input {...getInputProps()}/>
        <Image avatar size='small' src={getAvatar()} />
      </div>
        <Form.Input name="firstname" placeholder="Nombre" onChange={formik.handleChange}
          value={user ? user.firstname : ""} error={formik.errors.firstname}
        />
        <Form.Input name="lastname" placeholder="Apellidos" onChange={formik.handleChange}
          value={user ? user.lastname : ""} error={formik.errors.lastname}
        />
        <Form.Input name="email" placeholder="Correo electronico" onChange={formik.handleChange}
          value={user ? user.email : ""} error={formik.errors.email}
        />
      <Form.Input type='password' name="password" placeholder="Contraseña" 
        onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}
      />
      <div className='formDivButton'>
        <Form.Button type='submit' primary fluid onClick={closeForm} >
            Cancelar
        </Form.Button>
        <Form.Button type='submit' primary fluid loading={formik.isSubmitting} >
            Actualizar
        </Form.Button>
      </div>
    </Form>
  )
}
