import React from 'react';
import ReactDOM from 'react-dom';
// import thunk from 'redux-thunk';
// import { compose, createStore, applyMiddleware } from 'redux';
import App from './components/app/app';

// // @NB(2021-07-14) - temporary disabled
// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));
// const store = createStore(rootReducer, enhancer);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('app-root')
);
