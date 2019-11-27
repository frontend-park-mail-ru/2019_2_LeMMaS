import { html, safeHtml } from "common-tags";
import classNames from "classnames";

import API from "../../modules/api";
import User from "../../modules/user";
import BaseComponent from "../baseComponent";

import "./style.css";
import Loader from "../loader";

export class Leaderboard extends BaseComponent {
    start = () => {
        const loader = new Loader(
            this.parent.parentElement,
            this.parent.parentElement.parentElement
        );
        loader.show();
        API.listUsers().then(users => {
            const interval = setInterval(() => {
                if (User.getCurrentUser() !== undefined) {
                    this.render(User.getCurrentUser(), users);
                    loader.hide();
                    clearInterval(interval);
                }
            }, 200);
        });
    };

    render = (currentUser, userList) => {
        const leaderboardClass = classNames("leaderboard", {
            "leaderboard__type-with-me": currentUser !== null,
        });
        let i = 1;
        this.parent.innerHTML += html`
            <div class="${leaderboardClass}">
                ${userList.map(
                    player => safeHtml`
                    <div class="leaderboard__player ${
                        currentUser && player.id === currentUser.id
                            ? "leaderboard__player_me"
                            : ""
                    }">
                        <span class="leaderboard__player-name">${
                            player.name
                        }</span>
                        <span class="leaderboard__player-position">${i++}</span>
                    </div>
                    `
                )}
            </div>
        `;
    };
}


export class GameLeaderboard extends BaseComponent {
    constructor(props) {
        super(props);
        this.players = new Map();
    }

    addPlayer = (username, id, isCurrentUser, size) => {
        this.players.set(id, {id, username, isCurrentUser, size});
        this.update();
    };

    update = (id, size) => {
        this.parent.innerHTML = "";
        if(this.players.get(id)) {
            this.players.get(id).size = size;
        }
        const sortedPlayers = [...this.players.values()].sort(this.compare);
        sortedPlayers.forEach(player => {
           this._renderOnePlayer(player);
        });
    };

    compare = (a, b) => {
        if (a.size >= b.size) return -1;
        if (a.size < b.size) return 1;
    };

    _renderOnePlayer = (player) => {
        const { username } = player;
        const { isCurrentUser } = player;
        const { id } = player;
        const { size } = player;

        this.parent.innerHTML +=
            safeHtml`
                    <div class="leaderboard__player id_${id} ${
                isCurrentUser
                    ? "leaderboard__player_me"
                    : ""
            }">
                        <span class="leaderboard__player-name">${
                username
            }</span>
                                                <span class="leaderboard__player-position">${(size - 40) / 2}</span>
                    </div>
                    `
        ;
    };

    removePlayer = (id) => {

        this.players.delete(id);
        this._removeOnePlayer(id);
    };

    _removeOnePlayer = (id) => {
        this.parent.removeChild(this.parent.querySelector(`.id_${id}`));
    };
}
