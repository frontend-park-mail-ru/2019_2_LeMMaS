import { html, safeHtml } from "common-tags";

import API from "../../api";
import User from "../../user";

import "./style.css";

export default class Leaderboard {
    constructor(parent) {
        this.parent = parent;
    }

    start() {
        User.getCurrentUser().then(currentUser => {
            API.listUsers().then(users => {
                this.render(currentUser, users);
            });
        });
    }

    render(currentUser, userList) {
        let i = 1;
        this.parent.innerHTML = html`
            <div class="leaderboard">
                ${userList.map(
                    player => safeHtml`
                    <div class="leaderboard__player ${
                        currentUser && player.id === currentUser.id
                            ? "leaderboard__player_me"
                            : ""
                    }">
                        ${i++}. 
                        <span class="leaderboard__player-name">${
                            player.name
                        }</span>
                        <span class="leaderboard__player-email">${
                            player.email
                        }</span>
                    </div>
                    `
                )}
            </div>
        `;
    }
}
