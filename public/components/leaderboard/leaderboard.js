import "./leaderboard.css";
import "./__player/leaderboard__player-me.css";

class Leaderboard {
    constructor(){

    }

    render(){
        const leaderboard = document.createElement("div");
        leaderboard.className = "leaderboard";
        let iter = 0;
        while(iter !== 20)
        {
            const leaderboardPlayer = document.createElement("div");
            leaderboardPlayer.className = "leaderboard__player";
            leaderboardPlayer.innerText = `${iter + 1}. player`;
            leaderboard.appendChild(leaderboardPlayer);
            iter++;
        }
        return leaderboard;
    }
}

export default Leaderboard;
