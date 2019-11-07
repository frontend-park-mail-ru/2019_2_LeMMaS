import { html, safeHtml } from "common-tags";

import API from "../../modules/api";
import User from "../../modules/user";
import BaseComponent from "../baseComponent";

import "./style.css";

export default class Leaderboard extends BaseComponent {
    start = () =>
        API.listUsers().then(users => {
            this.render(User.getCurrentUser(), users);
        });

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
