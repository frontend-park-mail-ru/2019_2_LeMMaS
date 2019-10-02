class backendIntegrator {

    login(login, password)
    {
        console.log("fetch");
        const url = "http://151.248.118.254:8080/api/v1/login";
        const response = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            origin: true,
            body: JSON.stringify({ "login": login, "password": password})})
            .then(() => alert(response.status));
    }
    register(login, password, email)
    {
        console.log("fetch");
        const url = "http://151.248.118.254:8080/api/v1/register";
        const response = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            origin: true,
            body: JSON.stringify({ "login": login, "password": password, "email": email})})
            .then(() => alert(response.status));
    }
}

export default backendIntegrator;
