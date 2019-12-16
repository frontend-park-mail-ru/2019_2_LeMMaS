import ModalWindow from "components/modalWindow";
import { GameLeaderboard } from "components/leaderboard";
import router from "modules/router";
import User from "modules/user";
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
import "./style.css";
import Background from "./Background/Background";

import { v4 as uuid } from 'uuid';

export default class SinglePlayer {
    private parent: HTMLElement;
    private balls: Balls;
    private food: Food;
    private mouseCoordinates: { x: number; y: number };
    private easingTarget: { x: number; y: number };
    private currentUserID: number;
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

        this.balls = new Balls(this.gameCanvas);
        this.food = new Food(this.gameCanvas);

        this.mouseCoordinates = {
            x: 0,
            y: 0,
        };

        this.easingTarget = {
            x: 0,
            y: 0,
        };

        this.prevSpeed = 0;

        this.timeouts = [];

        this.gameEnded = false;

        this.currentUserID = uuid();

        this.background = new Background(this.gameCanvas);
    }

    public start = (): void => {
        document.addEventListener("keydown", this._escapeKeyHandler);

        this.gameFinishButton.addEventListener(
            "click",
            this._modalWindowHandler
        );

        window.addEventListener("pushstate", this._onPageChange);

        this.modalWindow = new ModalWindow(document.body);

        const leaderboardWrapper = document.querySelector(
            ".leaderboard-wrapper"
        );
        this.leaderBoard = new GameLeaderboard(leaderboardWrapper);

        window.addEventListener("resize", this._onWindowResize);

        this.balls.set(this.currentUserID, new Ball(
            this.currentUserID,
            1500,
            1500,
            20,
            "green",
        ));

        for (let count = 0; count < 3; count++) {
            this.balls.set(uuid(), new Ball(
                uuid(),
                (Math.random() * window.innerWidth) / 2,
                (Math.random() * window.innerHeight) / 2,
                20,
                "yellow",
                )
            );
        }

        for (let count = 0; count < 100; count++) {
            this.food.add(
                count,
                Math.round(Math.random() * window.innerWidth * 2),
                Math.round(Math.random() * window.innerHeight * 2)
            );
        }

        document.addEventListener("mousemove", this._handleMouseMove);

        this._redrawAllBalls();
    };

    private _onWindowResize = (): void => {
        const canvas: HTMLCanvasElement = document?.querySelector(
            ".gameCanvas"
        );

        Offset.x -= (canvas.width - window.innerWidth * 2) / 2;
        Offset.y -= (canvas.height - window.innerHeight * 2) / 2;

        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
    };


    private _handleMouseMove = (event: MouseEvent): void => {
        const newPosition = this.getNewPosition(this._countAndSendDirection(event.clientX, event.clientY));
        this.mouseCoordinates.x = event.clientX;
        this.mouseCoordinates.y = event.clientY;
        this.easingTarget.x = newPosition.X;
        this.easingTarget.y = newPosition.Y;
        this._moveMyBall();
    };

    private getNewPosition (direction) {
        const directionRadians = (direction) * Math.PI / 180;
        const distance = 1;
        const deltaX = distance * Math.sin(directionRadians);
        const deltaY = -distance * Math.cos(directionRadians);
        const oldPosition = {
            X: this.balls.get(this.currentUserID).x,
            Y: this.balls.get(this.currentUserID).y
        };
        const newPosition = {
            X: Math.round((oldPosition.X) + deltaX),
            Y: Math.round((oldPosition.Y) + deltaY),
        };

        if (newPosition.X > 3000) {
            newPosition.X = 3000;
        }
        if (newPosition.Y > 3000) {
            newPosition.Y = 3000;
        }
        if (newPosition.X < 0) {
            newPosition.X = 0;
        }
        if (newPosition.Y < 0) {
            newPosition.Y = 0;
        }
        return newPosition;
    }

    _moveMyBall = () => {
        if (
            this.easingTarget.x === this.balls.get(this.currentUserID).x + this.balls.get(this.currentUserID).radius &&
            this.easingTarget.y === this.balls.get(this.currentUserID).y + this.balls.get(this.currentUserID).radius
        ) {
            return;
        }

        /*
        this.balls.get(this.currentUserID).x += (this.easingTarget.x - this.balls.get(this.currentUserID).x) * 0.01;
        this.balls.get(this.currentUserID).y += (this.easingTarget.y - this.balls.get(this.currentUserID).y) * 0.01;
        */

        const ballToMove = this.balls.get(this.currentUserID);

        Offset.setX(
            ballToMove.x - Scale.countWithScale(this.easingTarget.x)
        );
        Offset.setY(
            ballToMove.y - Scale.countWithScale(this.easingTarget.y)
        );

        ballToMove.setTarget(
            Scale.countWithScale(this.easingTarget.x),
            Scale.countWithScale(this.easingTarget.y)
        );

        this.timeouts.push(setTimeout(() => this._moveMyBall(), 100));
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

        }
    };

    private _countAndSendDirection = (x: number, y: number): number => {
        const radians = Math.atan2(
            y - window.innerHeight / 2,
            x - window.innerWidth / 2
        );
        let angle = Math.round(radians * (180 / Math.PI)) + 90;

        if (x - window.innerWidth / 2 < 0 && y - window.innerHeight / 2 < 0) {
            angle = 360 + angle;
        }
        console.log(angle);
        return angle;
    };

    private _moveBall = (ball: Ball): void => {
        if (ball.id === this.currentUserID) {
            if (
                window.innerWidth / 2 > this.mouseCoordinates.x - ball.radius &&
                window.innerWidth / 2 < this.mouseCoordinates.x + ball.radius &&
                window.innerHeight / 2 > this.mouseCoordinates.y - ball.radius &&
                window.innerHeight / 2 < this.mouseCoordinates.y + ball.radius
            ) {
                console.log("dc");
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

        let dx = 2;
        let dy = -1;
        
        this.balls.getAllBalls().forEach(ball => {
            if (ball.id !== this.currentUserID) {
                if (
                    ball.x + dx > this.gameCanvas.width - ball.radius ||
                    ball.x + dx < ball.radius
                ) {
                    dx = -dx;
                }
                if (
                    ball.y + dy > this.gameCanvas.height - ball.radius ||
                    ball.y + dy < ball.radius
                ) {
                    dy = -dy;
                }

                ball.x += dx * 2;
                ball.y += dy * 2;
            }
        });

        requestAnimationFrame(() => {
            if (!this.gameEnded) {
                this._redrawAllBalls();
            }
        });
    };

    private _end = (): void => {
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
