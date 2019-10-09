class BackendIntegrator {

    login(login, password)
    {
        console.log("fetch");
        const url = "http://localhost:8080/api/v1/login";
        let status;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            origin: true,
            body: JSON.stringify({ "login": login, "password": password})})
            .then(response => {
                status = response.status;
                return response;
            })
            .then(response => response.json());
        
        return status;
    }

    register(login, password, email)
    {
        console.log("fetch");
        const url = "http://localhost:8080/api/v1/register";
        fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            origin: true,
            body: JSON.stringify({ "login": login, "password": password, "email": email})})
            .then(response => {
                status = response.status;
                return response;
            })
            .then(response => alert(response.status));

        return status;
    }
}

export default BackendIntegrator;
