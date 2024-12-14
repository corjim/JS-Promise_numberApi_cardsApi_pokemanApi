
let favNum = 8
let url = `http://numbersapi.com/${favNum}?json`

// Getting a fact a favorite number
axios.get(`${url}`)
    .then(res => {
        console.log(res)
    })

// multiple numbers in a single request.
let favNUms = [11, 28, 13]
let baseURL = `http://numbersapi.com/${favNUms}?json`

axios.get(baseURL)
    .then(res => {
        console.log(res)
    })

//  Four facts on your favorite number.
Promise.all(
    Array.from({ length: 4 }, () => {
        return axios.get(`${url}/${favNum}?json`);
    })
).then(facts => {
    // console.log(facts.data)
    facts.forEach(facts => $("h6").append(`<p>${facts.data}</p>`));
});