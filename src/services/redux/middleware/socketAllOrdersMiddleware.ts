import { Middleware } from 'redux';

type WsActions = {
	wsAllOrdersInit: string,
	onOpenAllOrders: string,
	onErrorAllOrders: string,
	onCloseAllOrders: string,
	getAllOrders: string,
};

export const socketAllOrdersMiddleware = (
	wsUrl: string,
	wsAllOrdersActions: WsActions
): Middleware => {
    return (store) => {
		let socket: WebSocket | null = null;

		return next => action => {
			const { dispatch } = store;
			const { type } = action;
			const {
				wsAllOrdersInit,
				onOpenAllOrders,
				onErrorAllOrders,
				onCloseAllOrders,
				getAllOrders,
			} = wsAllOrdersActions;

			if (type === wsAllOrdersInit) {
				socket = new WebSocket(`${wsUrl}/all`);
			}

			if (socket) {
				socket.onopen = event => {
					dispatch({ type: onOpenAllOrders, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: onErrorAllOrders, payload: event });
				};

				socket.onclose = event => {
					dispatch({ type: onCloseAllOrders, payload: event });
				};

				socket.onmessage = event => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData } = parsedData;
					if (!success) {
						console.log('ws all orders error:', restParsedData.message);
					}

					dispatch({ type: getAllOrders, ordersResult: restParsedData });
				};
			}

			next(action);
		};
	};
};
