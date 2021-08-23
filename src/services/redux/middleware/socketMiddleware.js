import { getCookie } from "../../helpers";

export const socketMiddleware = (wsUrl, wsActions) => {
    return store => {
		let socket = null;

		return next => action => {
			const { dispatch } = store;
			const { type, payload } = action;
			const { wsInit, onOpen, onClose, onError, onMessage, wsSendMessage } = wsActions;
			const token = getCookie('accessToken');
			if (type === wsInit && token) {
				socket = new WebSocket(`${wsUrl}?token=${token}`);
			}
			if (socket) {
			socket.onopen = event => {
				console.log('socket working');
				dispatch({ type: onOpen, payload: event });
			};

			socket.onerror = event => {
				dispatch({ type: onError, payload: event });
			};

			socket.onmessage = event => {
				const { data } = event;
				const parsedData = JSON.parse(data);
				const { success, ...restParsedData } = parsedData;

				dispatch({ type: onMessage, payload: restParsedData });
			};

			socket.onclose = event => {
				dispatch({ type: onClose, payload: event });
			};

			if (type === wsSendMessage) {
				const message = { ...payload, token };
				socket.send(JSON.stringify(message));
			}
			}

			next(action);
		};
    };
};
