import ModalWindow from "components/modalWindow";
import { GameLeaderboard } from "components/leaderboard";
import router from "modules/router";
import User from "modules/user";

import Ball from "./Ball/Ball";
import Balls from "./Ball/Balls";
import Food from "./Food/Food";

import Offset from "./Offset";
import Scale from "./Scale";

import "./style.css";
import Background from "./Background/Background";
import { GAME_FIELD_SIZE } from "./const";

export default class SinglePlayer {
    private parent: HTMLElement;
    private balls: Balls;
    private food: Food;
    private mouseCoordinates: { x: number; y: number };
    private currentUserID: number;
    private modalWindow: ModalWindow;
    private timeouts: Map<string, any>;
    private gameEnded: boolean;
    private leaderBoard: GameLeaderboard;
    private gameCanvas: HTMLCanvasElement;
    private gameFinishButton: HTMLDivElement;
    private background: Background;
    private following: {ball: Ball};
    private score: HTMLParagraphElement;

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
            x: undefined,
            y: undefined,
        };

        this.timeouts = new Map<string, any>();

        this.gameEnded = false;
        if (User.isLoggedIn()) {
            this.currentUserID = User.getCurrentUser().id;
        } else {
            this.currentUserID = Math.random() * 1000;
        }

        this.background = new Background(this.gameCanvas);
        this.score = document.querySelector(".gameScore__number");
    }

    public start = (): void => {
        Offset.reset();

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
            GAME_FIELD_SIZE / 2,
            GAME_FIELD_SIZE / 2,
            10,
            "green",
        ));

        for (let count = 0; count < 10; count++) {
            const id = Math.floor(Math.random() * 100);
            this.balls.set(id, new Ball(
                id,
                (Math.random() * GAME_FIELD_SIZE),
                (Math.random() * GAME_FIELD_SIZE),
                10,
                "yellow",
                )
            );
        }

        this.balls.set(10, new Ball(
            10,
            1600,
            1600,
            10,
            "yellow",
            )
        );

        for (let count = 0; count < 200; count++) {
            this.food.add(
                count,
                Math.round(Math.random() * GAME_FIELD_SIZE),
                Math.round(Math.random() * GAME_FIELD_SIZE)
            );
        }

        document.addEventListener("mousemove", this._handleMouseMove);

        this._redrawAllBalls();

        this.balls.getAllBalls().forEach(ball => this._moveBall(ball));
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
        this.mouseCoordinates.x = event.clientX;
        this.mouseCoordinates.y = event.clientY;
    };

    private getNewPosition (direction) {
        const directionRadians = (direction) * Math.PI / 180;
        const distance = 1000;
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

        if (newPosition.X > Scale.countWithScale(GAME_FIELD_SIZE) + 1000) {
            newPosition.X = Scale.countWithScale(GAME_FIELD_SIZE);
        }
        if (newPosition.Y > Scale.countWithScale(GAME_FIELD_SIZE) + 1000) {
            newPosition.Y = Scale.countWithScale(GAME_FIELD_SIZE);
        }
        if (newPosition.X < 0) {
            newPosition.X = 0;
        }
        if (newPosition.Y < 0) {
            newPosition.Y = 0;
        }
        return newPosition;
    }

    private _moveBall = (ballToMove: Ball): void => {
        const easing = 0.01;

        if (ballToMove.id === this.currentUserID) {
            if (!this.mouseCoordinates.x && !this.mouseCoordinates.y) {
                this.timeouts.set("moveBall", setTimeout(() => this._moveBall(ballToMove), 1000/60));
                return;
            }
            const newPosition = this.getNewPosition(this._countDirection(this.mouseCoordinates.x, this.mouseCoordinates.y));

            ballToMove.easingTargetX = newPosition.X;
            ballToMove.easingTargetY = newPosition.Y;

            Offset.x -= (ballToMove.easingTargetX - ballToMove.x) * easing;
            Offset.y -= (ballToMove.easingTargetY - ballToMove.y) * easing;
        }

        ballToMove.x += (ballToMove.easingTargetX - ballToMove.x) * easing;
        ballToMove.y += (ballToMove.easingTargetY - ballToMove.y) * easing;
        this.timeouts.set("moveBall", setTimeout(() => this._moveBall(ballToMove), 1000/60));
    };

    private _countDirection = (x: number, y: number): number => {
        const radians = Math.atan2(
            y - window.innerHeight / 2,
            x - window.innerWidth / 2
        );
        let angle = Math.round(radians * (180 / Math.PI)) + 90;

        if (x - window.innerWidth / 2 < 0 && y - window.innerHeight / 2 < 0) {
            angle = 360 + angle;
        }
        return angle;
    };

    private _redrawAllBalls = (): void => {
        this.background.draw();
        this.food.draw();
        this.balls.draw();

        this.balls.getAllBalls().forEach(ball => {
            this._detectFoodEating(ball);
            this.balls.getAllBalls().forEach(ball1 => {
                this.balls.getAllBalls().forEach(ball2 => {
                    if (ball1 !== ball2) {
                        this._detectBallEating(ball1, ball2);
                    }
                });
            });

            if (ball.id !== this.currentUserID) {
                const currentUserBall = this.balls.get(this.currentUserID);
                if (ball.radius > currentUserBall.radius && !this.following?.ball) {
                    if (!this.following) {
                        this.following = { ball };
                    }
                    ball.easingTargetY = currentUserBall.y;
                    ball.easingTargetX = currentUserBall.x;
                } else {
                    const closerFood = this.food.getCloserFood(ball.x, ball.y);
                    if (closerFood) {
                        ball.easingTargetY = closerFood.y;
                        ball.easingTargetX = closerFood.x;
                    }
                }
            }
        });

        requestAnimationFrame(() => {
            if (!this.gameEnded) {
                this._redrawAllBalls();
            }
        });
    };

    private _detectFoodEating = (ball: Ball) => {
        this.food.getFood().forEach(foodElement => {
            if (
                ball.x > foodElement.x - ball.radius &&
                ball.x < foodElement.x + ball.radius &&
                ball.y > foodElement.y - ball.radius &&
                ball.y < foodElement.y + ball.radius
            ) {
                ball.increaseRadius(2);
                this.food.delete(foodElement.id);
                this.food.draw();
                if (ball.id === this.currentUserID) {
                    this.scoreIncrement();
                }
            }
        });
    };

    _detectBallEating = (ball1: Ball, ball2: Ball) => {
        let small = ball1,
            large = ball1;
        if (ball1.radius === ball2.radius) {
            return;
        } else if (ball1.radius < ball2.radius) {
            large = ball2;
        } else {
            small = ball2;
        }

        if (
            small.x + small.radius < large.x + large.radius &&
            small.x - small.radius > large.x - large.radius &&
            small.y + small.radius < large.y + large.radius &&
            small.y - small.radius > large.y - large.radius
        ) {
            if (small.id === this.currentUserID) {
                this._end();
                this.modalWindow.start(
                    "Вы проиграли. Хотите начать заново?",
                    () => {
                        this.modalWindow.close();
                        this.start();
                    },
                    () => {
                        this.modalWindow.close();
                        this._exit();
                    }
                );
            } else {
                this.balls.delete(small.id);
                large.increaseRadius(5);
                if (large.id === this.currentUserID) {
                    this.scoreIncrement();
                }
            }
        }
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

        this.balls.clear();
        this.food.clear();
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

    private scoreIncrement = () => {
        this.score.innerText = String(parseInt(this.score.innerText) + 1);
    };
}
