import axios from 'axios'

const url = 'http://localhost:1996/novels'

export const fetchNovels = () => axios.get(url)