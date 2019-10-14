import { html } from "common-tags";

import API from "../../api";

import "./style.css";

export default class Leaderboard {
    constructor(parent) {
        this.parent = parent;
    }

    async render() {
        const players = await API.listUsers();
        this.parent.innerHTML = html`
            <div class="leaderboard">
                ${players.map(
                    player => `
                    <div class="leaderboard__player ${
                        player.id == 2 ? "leaderboard__player-me" : ""
                    }">
                        ${player.id}. ${player.name}
                    </div>
                    `
                )}
            </div>
        `;
    }
}
