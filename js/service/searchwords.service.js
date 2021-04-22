'use strict'

var gSearchWords;

function getSearchWords() {
    return gSearchWords;
}

function increaseWord(word) {
    const wordIdx = gSearchWords.findIndex(searchword => searchword.value === word);
    gSearchWords[wordIdx].size++;
    saveToStorage('search-words', gSearchWords)
}

function LoadSearchWords() {
    gSearchWords = getFromStorage('search-words');

    if (!gSearchWords) {
        gSearchWords = [
            {
                word: 'funny',
                value: 'funny',
                size: 14
            },

            {
                word: 'baby',
                value: 'baby',
                size: 14
            },

            {
                word: 'cute',
                value: 'cute',
                size: 14
            },

            {
                word: 'puppy',
                value: 'puppy',
                size: 14
            },

            {
                word: 'all',
                value: ' ',
                size: 14
            },
        ]
    }
}

