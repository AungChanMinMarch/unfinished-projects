import instance from './instance.js'
export const GET =  (pathname)=> instance({
	method: 'get',
	url: pathname,
})