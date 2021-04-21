'use strict'

let gCanvas;
let gCtx;
let gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function init() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners();
    LoadSearchWords();
    renderSearchWords();
    getGalleryFromStorage();
    renderGallery();
    renderMemesGallery();
}

function onImgSelect(id) {
    changeMemeImg(id);
    resizeCanvas();
    renderCanvas();
    onShowGenerator()
}

function onShowMemesGallery() {
    document.querySelector('.memes-gallery-container').classList.remove('no-display')
    document.querySelector('.gallery').classList.add('no-display')
    document.querySelector('.generator').classList.add('no-display')
}

function onShowGallery() {
    document.querySelector('.gallery').classList.remove('no-display')
    document.querySelector('.generator').classList.add('no-display')
    document.querySelector('.memes-gallery-container').classList.add('no-display')
}

function onShowGenerator() {
    document.querySelector('.generator').classList.remove('no-display')
    document.querySelector('.gallery').classList.add('no-display')
    document.querySelector('.memes-gallery-container').classList.add('no-display')
}

function resizeCanvas() {
    document.querySelector('#canvas').style.width = '100%'
    document.querySelector('#canvas').style.height = '100%'
}

function renderCanvas() {
    drawImg();
}

function drawImg() {
    const meme = getGMeme();
    const gallery = getGGallery();
    var img = new Image()
    img.src = gallery[meme.imgId-1].url;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        drawText();
    }
}

function drawText() {
    const meme = getGMeme();
    meme.lines.forEach(line => {
        gCtx.textAlign = `${line.align}`;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.fillStyle = `${line.color}`;
        gCtx.fillText(`${line.txt}`, line.pos.x, line.pos.y);
        gCtx.lineWidth = 3;
        gCtx.strokeStyle = line.stroke;
        gCtx.strokeText(`${line.txt}`, line.pos.x, line.pos.y);
    })
    document.querySelector('.text-editor input').value = meme.lines[meme.selectedLineIdx].txt;
}

function renderGallery() {
    const gallery = getGGallery();
    let htmlStr = gallery.map(img => {
        return `<div onclick="onImgSelect(${img.id})" class="gallery-img"><img src="${img.url}"></div>`
    })
    document.querySelector('.gallery').innerHTML = htmlStr.join('');
}

function onSwitchLine() {
    let meme = getGMeme();
    switchLine();
    document.querySelector('.text-editor input').value = meme.lines[meme.selectedLineIdx].txt;
    document.querySelector('.text-editor input').focus();
}

function onNewText(val) {
    updateTxt(val);
    drawImg();
}

function onAddLine() {
    addLine();
    drawImg();
}

function onRemoveLine() {
    removeLine();
    drawImg();
}

function onMoveLine(val) {
    moveLine(val);
    drawImg();
}

function onChangeFontSize(val) {
    changeFontSize(val);
    drawImg();
}

function onChangeAlign(val) {
    changeAlign(val);
    drawImg();
}

function onChangeFont(val) {
    changeFont(val)
    drawImg();
}

function onOpenStrokeColor() {
    document.querySelector('input[name=stroke-color]').click();
}

function onChangeStrokeColor(val) {
    changeStrokeColor(val);
    drawImg();
}

function onOpenFontColor() {
    document.querySelector('input[name=font-color]').click();
}

function onChangeFontColor(val) {
    changeFontColor(val);
    drawImg();
}

function onDownload(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function onSaveMeme() {
    saveMeme();
    renderMemesGallery();
}

function renderMemesGallery() {
    const memes = getSavedMemes();
    let htmlStr = memes.map((meme, index) => {
        return `<div onclick="onMemeSelect(${index})" class="gallery-img relative"><img src="img/${meme.imgId}.jpg"><button onclick="onRemoveMeme(event, ${index})" class="remove-meme-btn">X</button></div>`
    })
    document.querySelector('.memes-gallery').innerHTML = htmlStr.join('');
}

function onMemeSelect(idx) {
    selectedMemeUpdate(idx)
    resizeCanvas();
    renderCanvas();
    onShowGenerator()
}

function onRemoveMeme(ev, idx) {
    ev.stopPropagation();
    removeMeme(idx);
    renderMemesGallery();
}

function onSearch(val) {
    const gallery = getGGalleryForSearch(val)
    let htmlStr = gallery.map(img => {
        return `<div onclick="onImgSelect(${img.id})" class="gallery-img"><img src="img/${img.id}.jpg"></div>`
    })
    document.querySelector('.gallery').innerHTML = htmlStr.join('');
}

// DRAG AND DROP

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isElementClicked(pos)) return
    document.body.style.cursor = 'grabbing'
    gStartPos = pos
}

function onMove(ev) {
    let meme = getGMeme();
    let currLine = meme.lines[meme.selectedLineIdx];
    if (currLine.isDragged) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y

        currLine.pos.x += dx
        currLine.pos.y += dy

        gStartPos = pos
        drawImg();
    }
}

function onUp() {
    let meme = getGMeme();
    let currLine = meme.lines[meme.selectedLineIdx];
    currLine.isDragged = false;
    document.body.style.cursor = 'default'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isElementClicked(clickedPos) {
    const meme = getGMeme();
    for (let i = 0; i < meme.lines.length; i++) {
        const { pos } = meme.lines[i];
        const startX = pos.x - (gCtx.measureText(meme.lines[i].txt).width / 2) - 50;
        const endX = pos.x + (gCtx.measureText(meme.lines[i].txt).width / 2) + 50;
        const startY = pos.y - 150;
        const endY = pos.y + 100;
        // console.log(`startX: ${startX}, endX: ${endX}, startY: ${startY}, endY: ${endY}, {${clickedPos.x}: ${clickedPos.y}}`)
        // console.log(gCanvas.height)
        if (clickedPos.x >= startX && clickedPos.x <= endX && clickedPos.y >= startY && clickedPos.y <= endY) {
            changeLine(i);
            dragLine();
            return true;
        }
    }
}

function renderSearchWords() {
    const words = getSearchWords();
    let htmlStr = words.map(word => {
        return `<span onclick="onSearchWord('${word.word}')" style="font-size: ${word.size}px">${word.word}</span>`
    })
    document.querySelector('.search-words-div').innerHTML = htmlStr.join('');
}

function onSearchWord(word) {
    increaseWord(word);
    onSearch(word);
    renderSearchWords();
}

function onUploadImg(ev) {
    createImg(URL.createObjectURL(ev.target.files[0]));
    saveGallery();
    renderGallery();
}

function onShareWhatsapp(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData2').value = gCanvas.toDataURL('image/jpeg');

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://wa.me/?image=${uploadedImgUrl}`, '_blank');
    }

    doUploadImg(elForm, onSuccess);
}

function onShareFacebook(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL('image/jpeg');

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer?u=${uploadedImgUrl}`, '_blank');
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    let formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}
