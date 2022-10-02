import sanityClient from '@sanity/client'
import imgUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
	// projectId: process.env.SANITY_PROJECT_ID,
	projectId:'qov5rr0r',
	dataset: 'production',
	apiVersion: '2022-04-14',
	useCDN: true,
	// token: process.env.SANITY_PROJECT_TOKEN
	token:'skwIczkRXXn5jmhFMkJbJIHBn6tB2gXquKZwBRiaiziwnMuENLXth2plbi6gtbCqjEkJI2344mkUYRUSGgll2kYWmHyAd7NrvvcfB0lPGLMtetoc98AZhC4RncRTkIDmJEXaYoi34xZnzW8gmQC7UJHW7ZY2BUEgo73GReNDNEkmBZJTF2w8'
})

const builder = imgUrlBuilder(client)
export const urlFor = (source)=>builder.image(source)