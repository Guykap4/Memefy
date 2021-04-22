'use strict'

var gGallery;

function getImgById(id) {
    return gGallery.find(img => img.id === id);
}

function getGGallery() {
    return gGallery;
}

function saveGallery() {
    saveToStorage('gallery', gGallery);
}

function getGGalleryForSearch(val) {
    const filteredGallery = gGallery.filter(img => img.search.includes(val.toLowerCase()))
    return filteredGallery;
}

function createImg(url) {
    const img = {
        id: gGallery.length + 1,
        url,
        search: 'new user upload'
    }

    gGallery.push(img);
}

function getGalleryFromStorage() {
    gGallery = getFromStorage('gallery');
    if (!gGallery) {
        gGallery = [
            {
                id: 1,
                url: `img/1.jpg`,
                search: 'trump angry blond finger',
            },
        
            {
                id: 2,
                url: `img/2.jpg`,
                search: 'dogs puppy puppies lick cute',
            },
        
            {
                id: 3,
                url: `img/3.jpg`,
                search: 'baby dog puppy cute blanket',
            },
        
            {
                id: 4,
                url: `img/4.jpg`,
                search: 'cat cute keyboard computer',
            },
        
            {
                id: 5,
                url: `img/5.jpg`,
                search: 'baby success funny beach',
            },
        
            {
                id: 6,
                url: `img/6.jpg`,
                search: 'aliens history funny channel television tv',
            },
        
            {
                id: 7,
                url: `img/7.jpg`,
                search: 'baby cute black surprise',
            },
        
            {
                id: 8,
                url: `img/8.jpg`,
                search: 'charlie choclate tell me more funny',
            },
        
            {
                id: 9,
                url: `img/9.jpg`,
                search: 'make them funny baby',
            },
        
            {
                id: 10,
                url: `img/10.jpg`,
                search: 'obama president black funny laughing',
            },
        
            {
                id: 11,
                url: `img/11.jpg`,
                search: 'black kissing moment sports',
            },
        
            {
                id: 12,
                url: `img/12.jpg`,
                search: 'what would you do pointing israel funny',
            },
        
            {
                id: 13,
                url: `img/13.jpg`,
                search: 'cup wine leonardo di bowtie funny',
            },
        
            {
                id: 14,
                url: `img/14.jpg`,
                search: 'what if i told you matrix black funny',
            },
        
            {
                id: 15,
                url: `img/15.jpg`,
                search: 'one does not simply lord of the rings lotr funny',
            },
        
            {
                id: 16,
                url: `img/16.jpg`,
                search: 'spock funny star trek laughing',
            },
        
            {
                id: 17,
                url: `img/17.jpg`,
                search: 'putin president tie russian scary',
            },
        
            {
                id: 18,
                url: `img/18.jpg`,
                search: 'everywhere snake buzzlightyear woody funny',
            },
        ]
    }
}