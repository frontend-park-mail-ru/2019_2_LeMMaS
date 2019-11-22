const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        // проверка поддерживает ли браузер sw
        window.addEventListener("load", () => {
            // sw будет работать на всем сайте, а не на отдельном урле
            navigator.serviceWorker.register("./sw.js").then(
                registration => {
                    // регистрация sw для одного устройства - 1 раз (до следующего обновления sw.js)
                    console.log(
                        "ServiceWorker registration successful with scope: ",
                        registration.scope
                    );
                },
                err => {
                    console.log("ServiceWorker registration failed: ", err);
                }
            );
        });
    }
};

export default registerServiceWorker;
