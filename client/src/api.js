const domain = 'http://localhost:5000';

export const requestHttp = async (path, body={}, method='GET') => {
    try {
        const params = {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }

        if (method === 'POST') {
            params.body = JSON.stringify(body)
        }

        const response = await fetch(domain + path, params)
    
        if (!response.ok) {
            console.log('response not ok');
            const json = await response.json()
            throw json
        }

        const json = await response.json()
        // console.log('JSON: ', json);

        return json
    
    } catch(err) {
        console.log('error in api request: ', err);
    }

} 