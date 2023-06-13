import state from './state.js'
import variables from './variables.js'

let { word } = state;
const {} = variables;

export const handleKeyUp = ({ target }) => {
    const value = target.value;
    word = value;
    console.log(word);
};