import state from './state.js'
import variables from './variables.js'

let { word, url } = state;
const {} = variables;


export const handleKeyUp = ({ target }) => {
    const value = target.value;
    word = value;
};

export const handleSubmit = async ({ target }) => {
    target.preventDefault();

    const responce = await fetch(`${url}${word}`);
    const data = await responce.json();
    console.log(responce);
};