import variables from './variables.js'
import { handleKeyUp, handleSubmit } from './functions.js';

const { input, form } = variables;

input.addEventListener('keyup', handleKeyUp);
form.addEventListener('submit', handleSubmit);