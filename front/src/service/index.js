import axios from "axios";

// Ancien pattern : Promise manuelle avec bug silencieux.
// Si l'API retourne un status 2xx ≠ 200, resolve(false) est appelé → stats = false → false.map() crash.
// Si l'API échoue (4xx/5xx), .catch ne résout jamais la Promise → setStats jamais appelé.
// export function getStat() {
//     return new Promise(resolve => {
//         axios.get(`api/characters/getAllCharacters`)
//         .then(res => res.status === 200 && res.data)
//         .then(resolve)
//         .catch(console.error)
//     })
// }

export function getStat() {
    return axios.get(`/api/characters/getAllCharacters`)
        .then(res => Array.isArray(res.data) ? res.data : [])
        .catch(() => []);
}

// export function insertPost(body) {
//     return new Promise(resolve => {
//         axios.post("http://localhost:4000/insert", body)
//         .then(res => res.status === 200 && res.data)
//         .then(resolve)
//         .catch(console.error)
//     })
// }
