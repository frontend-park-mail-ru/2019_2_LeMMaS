export default () => {
    if ("serviceWorker" in navigator) {
        // проверка поддерживает ли браузер sw
        window.addEventListener("load", function() {
            // sw будет работать на всем сайте, а не на отдельном урле
            navigator.serviceWorker.register("/sw.js").then(
                function(registration) {
                    // регистрация sw для одного устройства - 1 раз (до следующего обновления sw.js)
                    console.log(
                        "ServiceWorker registration successful with scope: ",
                        registration.scope
                    );
                },
                function(err) {
                    console.log("ServiceWorker registration failed: ", err);
                }
            );
        });
    }
};
