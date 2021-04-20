'use strict'

let gMeme = {
    imgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'Top Text',
            size: 100,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact',
            pos:
            {
                x: 275,
                y: 100
            },
            isDragged: false,
        },

        {
            txt: 'Bottom Text',
            size: 100,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact',
            pos:
            {
                x: 275,
                y: 500
            },
            isDragged: false,
        }
    ]
}

let gSavedMemes = getSavedMemes();

function removeMeme(idx) {
    gSavedMemes.splice(idx, 1);
    saveToStorage('saved-memes', gSavedMemes)
}

function selectedMemeUpdate(idx) {
    gMeme = gSavedMemes[idx];
}

function getSavedMemes() {
    let memes = getFromStorage('saved-memes');
    if(!memes) return [];
    else return memes;
}

function getGMeme() {
    return gMeme;
}

function changeMemeImg(id) {
    gMeme.imgId = id;
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
}

function updateTxt(val) {
    gMeme.lines[gMeme.selectedLineIdx].txt = val;
}

function createLine() {
    const line = {
        txt: 'New Text',
        size: 100,
        align: 'center',
        color: 'white',
        stroke: 'black',
        font: 'Impact',
        pos:
        {
            x: 275,
            y: 275
        },
        isDragged: false,
    }
    return line;
}

function saveMeme() {
    const newMeme = JSON.parse(JSON.stringify(gMeme))
    gSavedMemes.push(newMeme);
    saveToStorage('saved-memes', gSavedMemes)
}

function addLine() {
    gMeme.lines.push(createLine());
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx--;
}

function moveLine(val) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += val;
    console.log(gMeme.lines[gMeme.selectedLineIdx].pos.y);
}

function changeFontSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val;
}

function changeAlign(val) {
    gMeme.lines[gMeme.selectedLineIdx].align = val;
}

function changeFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].font = val;
}

function changeFontColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].color = val;
}

function changeStrokeColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = val;
}

function changeLine(i) {
    gMeme.selectedLineIdx = i;
}

function dragLine() {
    gMeme.lines[gMeme.selectedLineIdx].isDragged = true;
}
