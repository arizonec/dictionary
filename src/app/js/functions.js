import state from './state.js'
import variables from './variables.js'

let { word, url } = state;
const { containerWord } = variables;
// let copyState = { ...state }

export const handleKeyUp = ({ target }) => {
    const value = target.value;
    word = value;
    // copyState = { ...copyState, word: value};
};

export const handleSubmit = async (event) => {
    event.preventDefault();
    // const { word, url } = copyState;

    if(!word.trim()) return;
    try {
        const responce = await fetch(`${url}${word}`);
        const data = await responce.json();

        if(responce.ok && data.length) {
            insertWord();
        }
    } catch(err) {
        console.log(err);
    }
};

export const insertWord = () => {
    containerWord.innerText = word;
};

export const handleSound = () => {
    
};