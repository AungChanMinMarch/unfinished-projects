import { configureStore } from '@reduxjs/toolkit'
// import { createStore, applyMiddleware, compose } from 'redux';

// import thunk from 'redux-thunk';

import { reducers } from '@app/reducers';



// export default createStore(reducers, {}, compose(applyMiddleware(thunk))); //this method is not used because redux dev tool is not working
export default configureStore({
  reducer: reducers
})