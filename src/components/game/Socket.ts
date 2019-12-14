import api from "../../modules/api";

class Socket {
    private socket: WebSocket | undefined;

    open = (
        onMessage: (event: MessageEvent) => unknown,
        onClose: () => unknown
    ): void => {
        this.socket = api.openGameWebSocket();
        this.socket.onopen = (): void => {
            console.log("[open] Соединение установлено");
            console.log("Отправляем данные на сервер");
            this.socket && this.socket.send(`{"type" : "start"}`);
        };
        this.socket.onmessage = onMessage;
        this.socket.onclose = (event: CloseEvent): void => {
            if (event.wasClean) {
                console.log(
                    `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
                );
            } else {
                onClose();
                console.log("[close] Соединение прервано");
            }
        };
    };

    send = (message: string): void => {
        this.socket && this.socket.send(message);
    };

    close = (code?: number, reason?: string): void => {
        this.socket && this.socket.close(code, reason);
    };
}

export default new Socket();
