import { getCookie } from "../../helpers";

export const socketUserOrdersMiddleware = (wsUrl, wsUserOrdersActions) => {
    return store => {
		let socket = null;

		return next => action => {
			const { dispatch } = store;
			const { type } = action;
			const {
				wsUserOrdersInit,
				onOpenUserOrders,
				onErrorUserOrders,
				onCloseUserOrders,
				getUserOrders,
			} = wsUserOrdersActions;

            const token = getCookie('accessToken');

			if (type === wsUserOrdersInit && token) {
				socket = new WebSocket(`${wsUrl}?token=${token}`);
			}

			if (socket) {
				socket.onopen = event => {
					dispatch({ type: onOpenUserOrders, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: onErrorUserOrders, payload: event });
				};

				socket.onclose = event => {
					dispatch({ type: onCloseUserOrders, payload: event });
				};

				socket.onmessage = event => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData } = parsedData;

					dispatch({ type: getUserOrders, payload: restParsedData });
				};
			}

			next(action);
		};
	};
};
