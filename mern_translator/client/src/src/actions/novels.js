import * as api from '@app/api'

export const getNovels = () => async (dispatch) => {
    try {
        const { data } = await api.fetchNovels()
        dispatch({ type: "FETCH_ALL", payload: data });
    } catch (err) {
        console.log(err)
    }
}