'use strict'

var gGallery = [
    {
        id: 1,
        search: 'trump angry blond finger',
    },
    
    {
        id: 2,
        search: 'dogs puppy puppies lick cute',
    },

    {
        id: 3,
        search: 'baby dog puppy cute blanket',
    },
    
    {
        id: 4,
        search: 'cat cute keyboard computer',
    },
    
    {
        id: 5,
        search: 'baby success funny beach',
    },
    
    {
        id: 6,
        search: 'aliens history funny channel television tv',
    },
    
    {
        id: 7,
        search: 'baby cute black surprise',
    },
    
    {
        id: 8,
        search: 'charlie choclate tell me more funny',
    },
    
    {
        id: 9,
        search: 'make them funny baby',
    },
    
    {
        id: 10,
        search: 'obama president black funny laughing',
    },
    
    {
        id: 11,
        search: 'black kissing moment sports',
    },
    
    {
        id: 12,
        search: 'what would you do pointing israel funny',
    },
    
    {
        id: 13,
        search: 'cup wine leonardo di bowtie funny',
    },

    {
        id: 14,
        search: 'what if i told you matrix black funny',
    },
    
    {
        id: 15,
        search: 'one does not simply lord of the rings lotr funny',
    },
    
    {
        id: 16,
        search: 'spock funny star trek laughing',
    },
    
    {
        id: 17,
        search: 'putin president tie russian scary',
    },
    
    {
        id: 18,
        search: 'everywhere snake buzzlightyear woody funny',
    },
]

function getGGallery() {
    return gGallery;
}

function getGGalleryForSearch(val) {
    const filteredGallery = gGallery.filter(img => img.search.includes(val.toLowerCase()))
    return filteredGallery;
}