import state from './state.js'
import variables from './variables.js'

let { word, url, meanings, phonetics } = state;
const { containerWord, resultsList, results, error } = variables;
let copyState = { ...state }

export const handleKeyUp = ({ target }) => {
    const value = target.value;
    copyState.word = value;
};

export const showError = (err) => {
    error.style.display = 'block';  
    results.style.display = 'none';
    error.innerHTML = err.message;
};

export const handleSubmit = async (event) => {
    event.preventDefault();
    error.style.display = 'none';  
    if(!copyState.word.trim()) return;
    try {
        const responce = await fetch(`${url}${copyState.word}`);
        const data = await responce.json();

        if(responce.ok && data.length) {
            const item = data[0]
            copyState = {
                ...copyState,
                meanings: item.meanings,
                phonetics: item.phonetics,
            }
            console.log(copyState);
            insertWord();
            showResults();
        } else {
            showError(data);
        }
    } catch(err) {
        console.log(err);
    }
};

export const insertWord = () => {
    containerWord.innerText = copyState.word;
};

export const handleSound = () => {
    if(copyState.phonetics.length) {
        const sounds = copyState.phonetics[0];
        if(sounds.audio) {
            new Audio(sounds.audio).play();
        }
    }
};

export const renderDefinition = (itemDefinition) => {
    const example = itemDefinition.example ? `<div class="results-item__example"><p>Example: <span>${itemDefinition.example}</span></p></div>` : ''; 

    return `<div class="results-item__definition">
                <p>${itemDefinition.definition}</p>
                ${example}
            </div>`
};

export const getDef = (definitions) => {
    return definitions.map((definition) => renderDefinition(definition)).join('');
};

export const renderItem = (item) => {
    return `<div class="results-item">
                <div class="results-item__part">${item.partOfSpeech}</div>
                <div class="results-item__definitions">${getDef(item.definitions)}</div>
            </div>`
};

export const showResults = () => {
    results.style.display = 'block';
    resultsList.innerHTML = '';

    copyState.meanings.forEach((item) => resultsList.innerHTML += renderItem(item))
};

