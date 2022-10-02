export const count_unread_notis = state => state.notis.filter(noti => noti.read === false).length;
export const get_notis = state => state.notis
export const sentence_id_Selector = state => state.sentences[state.activeSentence]._id
export const activeSentence_Selector = state => state.activeSentence