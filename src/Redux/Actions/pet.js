import { Client } from "@petfinder/petfinder-js"

const client = new Client({
    apiKey: "2Y9UArwgWV579LoxM4RRgos9UvKMvBM8O6BTD0U7hgrXDPHjSv",
    secret: "pufPGC5JTlUYOHuTOaflW5aUf4EjAUFQAcGthUor"
});

export const getPet = currentPage => {
    return {
        type: 'GET_PET',
        payload: client.animal.search({ page: page ? currentPage : null })
    }
}