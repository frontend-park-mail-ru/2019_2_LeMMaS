import ModalWindow from "components/modalWindow";
import { GameLeaderboard } from "components/leaderboard";
import router from "modules/router";
import User from "modules/user";
import API from "modules/api";
import Ball from "./Ball/Ball";
import Balls from "./Ball/Balls";
import Food from "./Food/Food";
import {
    FoodElementResponse,
    SocketMessageData,
    PlayerResponse,
} from "./types";
import Offset from "./Offset";
import Scale from "./Scale";
import { ResponseUser } from "../../modules/responseBody";
import Socket from "./Socket";
import "./style.css";
import Background from "./Background/Background";

export default class Multiplayer {
    private parent: HTMLElement;
    private balls: Balls;
    private food: Food;
    private mouseCoordinates: { x: number; y: number };
    private currentUserID: number | undefined;
    private modalWindow: ModalWindow;
    private timeouts: Array<any>;
    private gameEnded: boolean;
    private leaderBoard: GameLeaderboard;
    private prevSpeed: number;
    private gameCanvas: HTMLCanvasElement;
    private gameFinishButton: HTMLDivElement;
    private background: Background;

    constructor(parent: HTMLElement) {
        this.parent = parent;
        const gameCanvasTemp: HTMLCanvasElement | null = document.querySelector(
            ".gameCanvas"
        );
        this.gameCanvas = gameCanvasTemp
            ? gameCanvasTemp
            : document.createElement("canvas");

        const gameFinishButtonTemp: HTMLDivElement | null = document.querySelector(
            ".game__finish-button"
        );

        this.gameFinishButton = gameFinishButtonTemp
            ? gameFinishButtonTemp
            : document.createElement("div");

        this.food = new Food(this.gameCanvas);
        this.balls = new Balls(this.gameCanvas);

        this.mouseCoordinates = {
            x: 0,
            y: 0,
        };
        this.prevSpeed = 0;

        this.timeouts = [];

        this.gameEnded = false;

        const user = User.getCurrentUser();
        if (!user) {
            return;
        }

        this.currentUserID = user.id;

        this.background = new Background(this.gameCanvas);
    }

    public start = (): void => {
        document.addEventListener("keydown", this._escapeKeyHandler);

        this.gameFinishButton.addEventListener(
            "click",
            this._modalWindowHandler
        );

        window.addEventListener("pushstate", this._onPageChange);

        Socket.open(this._messageHandler, this._end);

        this.modalWindow = new ModalWindow(document.body);

        const leaderboardWrapper = document.querySelector(
            ".leaderboard-wrapper"
        );
        this.leaderBoard = new GameLeaderboard(leaderboardWrapper);

        window.addEventListener("resize", this._onWindowResize);
    };

    private _onWindowResize = (): void => {
        const canvas: HTMLCanvasElement = document.querySelector(
            ".gameCanvas"
        );

        Offset.x -= (canvas.width - window.innerWidth * 2) / 2;
        Offset.y -= (canvas.height - window.innerHeight * 2) / 2;

        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
    };

    private _messageHandler = (event: MessageEvent): void => {
        const data: SocketMessageData = JSON.parse(event.data);
        switch (data.type) {
            case "start": {
                data.food.forEach((element: FoodElementResponse) => {
                    this.food.add(
                        element.id,
                        element.position.x,
                        element.position.y
                    );
                });

                if (data && data.players) {
                    data.players.forEach((player: PlayerResponse) => {
                        API.getUserInfoById(player.user_id).then(
                            (user: ResponseUser) => {
                                if (user.name) {
                                    this.leaderBoard.addPlayer(
                                        user.name,
                                        user.id,
                                        this.currentUserID === user.id,
                                        player.size
                                    );
                                }
                            }
                        );

                        const ball: Ball = new Ball(
                            player.user_id,
                            player.position.x,
                            player.position.y,
                            player.size / 2,
                            "yellow"
                        );

                        if (!this.balls.get(player.user_id)) {
                            this.balls.set(player.user_id, ball);
                        }
                    });
                }

                document.addEventListener("mousemove", this._handleMouseMove);
                requestAnimationFrame(this._redrawAllBalls);
                break;
            }
            case "move": {
                const ballToMove = this.balls.get(data.player.id);
                if (!ballToMove) {
                    return;
                }

                if (data.player.id == this.currentUserID) {
                    Offset.setX(
                        ballToMove.x - Scale.countWithScale(data.player.x)
                    );
                    Offset.setY(
                        ballToMove.y - Scale.countWithScale(data.player.y)
                    );
                }

                ballToMove.setTarget(
                    Scale.countWithScale(data.player.x),
                    Scale.countWithScale(data.player.y)
                );

                if (
                    Scale.countWithScale(data.player.size / 2) -
                        ballToMove.radius >
                    0
                ) {
                    this.leaderBoard.update(data.player.id, data.player.size);
                }
                ballToMove.radius = Scale.countWithScale(data.player.size / 2);
                this._moveBall(ballToMove);

                if (data.eatenFood.length > 0) {
                    data.eatenFood.forEach((id: number) => {
                        this.food.delete(id);
                    });
                }
                break;
            }
            case "new_player": {
                const player = data.player;
                API.getUserInfoById(player.user_id).then(
                    (user: ResponseUser) => {
                        if (user.name) {
                            this.leaderBoard.addPlayer(
                                user.name,
                                user.id,
                                this.currentUserID === user.id,
                                player.size
                            );
                        }
                    }
                );

                const ball = new Ball(
                    player.user_id,
                    player.position.x,
                    player.position.y,
                    player.size / 2,
                    "yellow"
                );

                API.getUserInfoById(player.user_id).then(
                    (user: ResponseUser) => {
                        if (user.avatar_path) {
                            const backgroundImage = new Image();
                            backgroundImage.src = user.avatar_path;
                            const currentBall = this.balls.get(player.user_id);
                            if (currentBall) {
                                currentBall.backgroundImage = backgroundImage;
                            } else {
                                ball.backgroundImage = backgroundImage;
                            }
                        }
                    }
                );

                if (!this.balls.get(player.user_id)) {
                    this.balls.set(player.user_id, ball);
                }
                break;
            }
            case "new_food": {
                data.food.forEach(element => {
                    this.food.add(
                        element.id,
                        element.position.x,
                        element.position.y
                    );
                });

                this.food.draw();

                break;
            }
            case "stop": {
                this.leaderBoard.removePlayer(data.user_id);
                if (data.user_id === this.currentUserID) {
                    this._pause();
                    this.modalWindow.start(
                        "Вы проиграли. Хотите сыграть еще раз?",
                        this._playAgain,
                        this._exit,
                        null
                    );
                }
                this.balls.delete(data.user_id);
            }
        }
    };

    private _handleMouseMove = (event: MouseEvent): void => {
        Socket.send(`{"type":"speed", "speed":100}`);

        this._countAndSendDirection(event.clientX, event.clientY);

        this.mouseCoordinates.x = event.clientX;
        this.mouseCoordinates.y = event.clientY;
    };

    private _countAndSendSpeed = (x: number, y: number): void => {
        if (!this.balls || !this.currentUserID) {
            return;
        }
        const currentBall = this.balls.get(this.currentUserID);

        const dis = Math.sqrt(
            Math.pow(x - window.innerWidth / 2, 2) +
                Math.pow(y - window.innerHeight / 2, 2)
        );

        const speed = Math.floor((dis / currentBall.radius) * 100);
        if (this.prevSpeed !== speed) {
            this.prevSpeed = speed;
            Socket.send(`{"type":"speed", "speed":100}`);
        }
    };

    private _countAndSendDirection = (x: number, y: number): void => {
        const radians = Math.atan2(
            y - window.innerHeight / 2,
            x - window.innerWidth / 2
        );
        let angle = Math.round(radians * (180 / Math.PI)) + 90;

        if (x - window.innerWidth / 2 < 0 && y - window.innerHeight / 2 < 0) {
            angle = 360 + angle;
        }

        Socket.send(`{"type":"direction", "direction":${angle}}`);
    };

    private _moveBall = (ball: Ball): void => {
        if (ball.id === this.currentUserID) {
            if (
                window.innerWidth / 2 > this.mouseCoordinates.x - ball.radius &&
                window.innerWidth / 2 < this.mouseCoordinates.x + ball.radius &&
                window.innerHeight / 2 > this.mouseCoordinates.y - ball.radius &&
                window.innerHeight / 2 < this.mouseCoordinates.y + ball.radius
            ) {
                Socket.send(`{"type":"speed", "speed":0}`);
                // this.socket.send(`{"type":"speed", "speed":0}`);
            } else {
                this._countAndSendSpeed(
                    this.mouseCoordinates.x,
                    this.mouseCoordinates.y
                );
                this.timeouts.push(setTimeout(() => this._moveBall(ball), 100));
            }
        } else {
            this.timeouts.push(setTimeout(() => this._moveBall(ball), 100));
        }
    };

    private _redrawAllBalls = (): void => {
        this.background.draw();
        this.food.draw();
        this.balls.draw();

        requestAnimationFrame(() => {
            if (!this.gameEnded) {
                this._redrawAllBalls();
            }
        });
    };

    private _end = (): void => {
        Socket.close(1000, "endGame");
        document.removeEventListener("keydown", this._escapeKeyHandler);
        this.gameFinishButton.removeEventListener(
            "click",
            this._modalWindowHandler
        );

        document.removeEventListener("mousemove", this._handleMouseMove);
        if (this.timeouts) {
            this.timeouts.forEach(timer => {
                clearTimeout(timer);
            });
        }
    };

    private _pause = (): void => {
        document.removeEventListener("mousemove", this._handleMouseMove);
    };

    private _resume = (): void => {
        document.addEventListener("mousemove", this._handleMouseMove);
    };

    private _exit = (): void => {
        this.gameEnded = true;
        this._end();

        document.body.style.background = "";

        const title: HTMLTitleElement | null = document.querySelector("title");

        window.history.pushState({}, title ? title.innerText : "", "/");
        router.renderPage();
    };

    private _playAgain = (): void => {
        this.modalWindow.close();
        this._end();
        this.start();
    };

    private _onPageChange = (): void => {
        document.removeEventListener("keydown", this._escapeKeyHandler);
        window.removeEventListener("popstate", this._onPageChange);
    };

    private _escapeKeyHandler = (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
            this._modalWindowHandler();
        }
    };

    private _modalWindowHandler = (): void => {
        document.removeEventListener("keydown", this._escapeKeyHandler);
        this._pause();
        this.modalWindow.start(
            "Покинуть игру?",
            () => {
                this.modalWindow.close();
                this._exit();
            },
            () => {
                this.modalWindow.close();
                document.addEventListener("keydown", this._escapeKeyHandler);
                this._resume();
            }
        );
    };
}
