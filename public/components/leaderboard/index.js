import { html } from "common-tags";
import "./style.css";

export default class Leaderboard {
    constructor(players) {
        this.players = players;
    }

    render() {
        return html`
            <div class="leaderboard">
                ${this.players.map(
                    player => `
                    <div class="leaderboard__player ${
                        player.isMe ? "leaderboard__player-me" : ""
                    }">
                        Player ${player.id}
                    </div>
                    `
                )}
            </div>
        `;
    }
}
