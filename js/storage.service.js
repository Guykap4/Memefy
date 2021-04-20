'use strict'

function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}