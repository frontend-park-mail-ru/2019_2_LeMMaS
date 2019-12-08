export interface SocketMessageData extends MessageEvent {
    food: Array<FoodElementResponse>;
    players: Array<PlayerResponse>;
    player: PlayerResponse;
    eatenFood: Array<number>;
    user_id: number;
}

export interface FoodElementResponse {
    id: number;
    position: Position;
}

export interface PlayerResponse {
    id: number;
    user_id: number;
    size: number;
    position: Position;
    x: number;
    y: number;
}

interface Position {
    x: number;
    y: number;
}

export interface FoodElement {
    id: number;
    x: number;
    y: number;
    color: string;
    emoji: string;
}