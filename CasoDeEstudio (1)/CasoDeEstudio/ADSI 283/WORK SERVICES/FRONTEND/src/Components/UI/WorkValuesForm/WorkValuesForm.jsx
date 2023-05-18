import * as Yup from "yup"

export function initialValues(work){
    return{
        imageWork: work?.imageWork || "",
        fileAvatar: null,
        name: work?.name || "",
        description: work?.description || "",
        date: work?.date || "",
        address: work?.address || "",
        price: work?.price || "",
        postulates: work?.postulates || "",
    }
}

export function validationSchema(work){
    return Yup.object({
        imageWork: Yup.string().required(true),
        name: Yup.string().required(true),
        description: Yup.string().required(true),
        date: Yup.string().required(true),
        address: Yup.string().required(true),
        price: Yup.string().required(true),
        postulates: Yup.string().required(true),
    })
}