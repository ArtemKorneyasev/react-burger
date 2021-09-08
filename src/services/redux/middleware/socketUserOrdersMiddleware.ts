import { Middleware } from 'redux';
import { getCookie } from '../../helpers';

type WsActions = {
	wsUserOrdersInit: string,
	onOpenUserOrders: string,
	onErrorUserOrders: string,
	onCloseUserOrders: string,
	getUserOrders: string,
};

export const socketUserOrdersMiddleware = (
	wsUrl: string,
	wsUserOrdersActions: WsActions,
): Middleware => {
    return store => {
		let socket: WebSocket | null = null;

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
					if (!success) {
						console.log('ws user orders error:', restParsedData.message);
					}

					dispatch({ type: getUserOrders, ordersResult: restParsedData });
				};
			}

			next(action);
		};
	};
};
