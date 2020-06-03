import Axios from 'axios';

export const covid = Axios.create({
    baseURL: "https://api.covid19india.org"
})