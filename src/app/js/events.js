import variables from './variables.js'
import { handleKeyUp, handleSubmit, handleSound } from './functions.js';

const { input, form, soundButton } = variables;

input.addEventListener('keyup', handleKeyUp);
form.addEventListener('submit', handleSubmit);
soundButton.addEventListener('click', handleSound)