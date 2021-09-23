const URL_BACK = 'http://localhost:8000'

async function MyFetch({ method, path, body }) {
    try {
        const res = await fetch(URL_BACK + path, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',

            }
        });
        console.log(res)
        let data = await res.json();
        console.log(data)
        return data;
    } catch (e) {
        e.message = "Fetch failed"
        return e
    }
}