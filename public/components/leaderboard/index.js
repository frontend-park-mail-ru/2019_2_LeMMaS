import { html } from "common-tags";

import API from "../../api";
import Session from "../../session";

import "./style.css";

export default class Leaderboard {
    constructor(parent) {
        this.parent = parent;
    }

    async render() {
        const currentUser = await Session.user();
        const players = await API.listUsers();
        this.parent.innerHTML = html`
            <div class="leaderboard">
                ${players.map(
                    player => `
                    <div class="leaderboard__player ${
                        currentUser && player.id == currentUser.id
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
