import Axios from 'axios';

export const covid = Axios.create({
    //api to check on the covid status
    baseURL: "https://api.covid19india.org"
})
