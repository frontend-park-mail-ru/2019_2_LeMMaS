import { html } from "common-tags";

import API from "../../api";
import Session from "../../session";

import "./style.css";

export default class Leaderboard {
    constructor(parent) {
        this.parent = parent;
    }

    start() {
        this.preRender().then(currentUser => {
            API.listUsers().then(userList => {
                this.render(currentUser, userList.body.users);
            });
        });
    }

    preRender() {
        return Session.getUserData();
    }

    render(currentUser, userList) {
        this.parent.innerHTML = html`
            <div class="leaderboard">
                ${userList.map(
                    player => `
                    <div class="leaderboard__player ${
                        currentUser && player.id === currentUser.id
                            ? "leaderboard__player-me"
                            : ""
                    }">
                        ${player.id}. ${player.name}
                    </div>
                    `
                )}
            </div>
        `;
    }
}
