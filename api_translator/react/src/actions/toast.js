import { toast, Flip } from 'react-toastify'

const updateToast = (id, message, type) =>{
	toast.update(id, {
		autoClose: 500,
		closeButton: null,
		transition: Flip,
		type: toast.TYPE[type],
		render: message,
	})
}
export const toastFetch = (description, somePromise)=>{
	const toastId = toast(description, {
		autoClose: false,
		closeButton: false
	})
	return new Promise((resolve, reject)=>{
		somePromise
		.then(res =>{
			updateToast(toastId, res.data?.message, 'SUCCESS')
			resolve(res)
		})
		.catch(err =>{
			updateToast(toastId, err.response.data?.message || 'idk something went wrong', 'ERROR')
			reject(err)
		})
	}) 
}