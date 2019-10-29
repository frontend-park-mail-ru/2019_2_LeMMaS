import { html, safeHtml } from "common-tags";

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
        let i = 1;
        this.parent.innerHTML = html`
            <div class="leaderboard">
                ${userList.map(
                    player => safeHtml`
                    <div class="leaderboard__player ${
                        currentUser && player.id === currentUser.id
                            ? "leaderboard__player-me"
                            : ""
                    }">
                        ${i++}. ${player.name}
                    </div>
                    `
                )}
            </div>
        `;
    }
}
