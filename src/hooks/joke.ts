import { toast } from 'react-toastify';
import { api } from "@/utility/axios";

export const getJoke = async (): Promise<string> => {
    const { data } = await api.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single');
    return 'joke' in data ? data.joke : 'Error on server. No Joke for you today =(';
}

export const pushUpJoke = async (): Promise<void> => {
    const { data } = await api.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single');
    const joke = 'joke' in data ? data.joke : 'Error on server. No Joke for you today =('
    toast.info(joke);
}