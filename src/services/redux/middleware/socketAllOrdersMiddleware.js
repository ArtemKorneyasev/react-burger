export const socketAllOrdersMiddleware = (wsUrl, wsAllOrdersActions) => {
    return store => {
		let socket = null;

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

					dispatch({ type: getAllOrders, payload: restParsedData });
				};
			}

			next(action);
		};
	};
};
