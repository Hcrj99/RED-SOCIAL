export const Ajax = async (url, method, dataSave = " ", archive = false) => {
    let charge = true;

    let options = {
        method: 'GET'
    };

    if (method === "GET" || method === "DELETE") {
        options = {
            method: method
        };
    }

    if (method === "POST" || method === "PUT") {
        archive ? (
            options = {
                method: method,
                body: dataSave,
            }
        ) : (options = {
            method: method,
            body: JSON.stringify(dataSave),
            headers: {
                "Content-type": "application/json"
            }
        });
    }

    const request = await fetch(url, options);
    const data = await request.json();

    charge = false;


    return {
        data,
        charge,
    };
}