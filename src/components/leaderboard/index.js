import { html, safeHtml } from "common-tags";

import api from "../../modules/api";
import User from "../../modules/user";
import BaseComponent from "../baseComponent";

import "./style.css";
import Loader from "../loader";

export default class Leaderboard extends BaseComponent {
    start = () => {
        const loader = new Loader(
            this.parent.parentElement,
            this.parent.parentElement.parentElement
        );
        loader.show();
        api.listUsers().then(users => {
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
        let i = 1;
        this.parent.innerHTML += html`
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
    };
}
