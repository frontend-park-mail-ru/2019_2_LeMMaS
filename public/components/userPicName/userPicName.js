import "./userPicName.css";
import "./__img/userPicName__img.css";
import "./__name/userPicName__name.css";

class UserPicName {
    constructor(){

    }

    render(){
        const userPicName = document.createElement("div");
        userPicName.className = "userPicName";

        const anchorImgWrapper = document.createElement("div");
        anchorImgWrapper.className = "anchorImg__wrapper";
        const userPicImg = document.createElement("img");
        userPicImg.className = "userPicName__img";
        userPicImg.alt = "userpic";
        userPicImg.src = "static/assets/img/userpic.png";
        const userPicA = document.createElement("a");
        userPicA.className = "anchorImg__position-absolute";
        userPicA.href = "settings";
        anchorImgWrapper.appendChild(userPicImg);
        anchorImgWrapper.appendChild(userPicA);

        const userA = document.createElement("a");
        userA.className = "userPicName__name";
        userA.href = "settings";
        userA.innerText = "UserName";

        userPicName.appendChild(anchorImgWrapper);
        userPicName.appendChild(userA);

        return userPicName;
    }
}

export default UserPicName;
