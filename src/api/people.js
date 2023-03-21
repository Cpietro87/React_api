export async function getPeople () {
    try {
        const response = await fetch("http://swapi.dev/api/people");
        const data = await response.json();
        return data;
        
    } catch (error) {
        
    }
}

class NetworkError extends Error {
    constructor(){
        super("Network error")
    }
}