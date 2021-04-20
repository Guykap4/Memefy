'use strict'

var gSearchWords;

function getSearchWords() {
    return gSearchWords;
}

function increaseWord(word) {
    const wordIdx = gSearchWords.findIndex(searchword => searchword.word === word);
    gSearchWords[wordIdx].size++;
    saveToStorage('search-words', gSearchWords)
}

function LoadSearchWords() {
    gSearchWords = getFromStorage('search-words');

    if (!gSearchWords) {
        gSearchWords = [
            {
                word: 'funny',
                size: 14
            },

            {
                word: 'baby',
                size: 14
            },

            {
                word: 'cute',
                size: 14
            },

            {
                word: 'puppy',
                size: 14
            },

            {
                word: 'laugh',
                size: 14
            },
        ]
    }
}

