import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import App from './App.js';
import store from './redux/store.js'
import { SocketContext, socket } from './context/socket.js'

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<SocketContext.Provider value={socket}>
			<App />
		</SocketContext.Provider>
		<ToastContainer 
			position='bottom-center'
			autoClose={1000}
			newestOnTop={true}
		/>
	</Provider>
);