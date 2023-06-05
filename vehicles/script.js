let currentPageUrl = 'https://swapi.dev/api/vehicles'

const images = {
    4: 'https://starwars-visualguide.com/assets/img/vehicles/4.jpg',
    6: 'https://starwars-visualguide.com/assets/img/vehicles/6.jpg',
    7: 'https://starwars-visualguide.com/assets/img/vehicles/7.jpg',
    8: 'https://starwars-visualguide.com/assets/img/vehicles/8.jpg',
    14: 'https://starwars-visualguide.com/assets/img/vehicles/14.jpg',
    16: 'https://starwars-visualguide.com/assets/img/vehicles/16.jpg',
    18: 'https://starwars-visualguide.com/assets/img/vehicles/18.jpg',
    19: 'https://starwars-visualguide.com/assets/img/vehicles/19.jpg',
    20: 'https://starwars-visualguide.com/assets/img/vehicles/20.jpg',
    24: 'https://starwars-visualguide.com/assets/img/vehicles/24.jpg',
    25: 'https://starwars-visualguide.com/assets/img/vehicles/25.jpg',
    26: 'https://starwars-visualguide.com/assets/img/vehicles/26.jpg',
    30: 'https://starwars-visualguide.com/assets/img/vehicles/30.jpg',
    33: 'https://starwars-visualguide.com/assets/img/vehicles/33.jpg',
    34: 'https://starwars-visualguide.com/assets/img/vehicles/34.jpg',
    35: 'https://starwars-visualguide.com/assets/img/vehicles/35.jpg',
    36: 'https://starwars-visualguide.com/assets/img/vehicles/36.jpg',
    37: 'https://starwars-visualguide.com/assets/img/vehicles/37.jpg',
    38: 'https://starwars-visualguide.com/assets/img/vehicles/38.jpg',
    42: 'https://starwars-visualguide.com/assets/img/vehicles/42.jpg',
    44: 'https://cdn.thingiverse.com/assets/9d/7d/2b/3a/7a/featured_preview_Screenshot_2019-12-11_00-05-16.png',
    45: 'https://img.swcombine.com//vehicles/62/large.jpg',
    46: 'https://static.wikia.nocookie.net/starwars/images/f/f6/XJ-6_hotrod.jpg',
    50: 'https://static.wikia.nocookie.net/starwars/images/5/5f/LAAT.jpg',
    51: 'https://i.pinimg.com/originals/b0/09/6c/b0096ca333a8ed697c39a5d90e14d304.jpg',
    53: 'https://static.wikia.nocookie.net/starwars/images/6/6f/ATTE-SWE.jpg',
    54: 'https://static.wikia.nocookie.net/starwars/images/5/5f/SPHA-T.jpg',
    55: 'https://jundroo.blob.core.windows.net/simplerockets/files/2020/12/23/4dZG1i/UserView-0.jpg',
    56: 'https://static.wikia.nocookie.net/starwars/images/1/13/NeimoidianShuttleSecretWeapons.png',
    57: 'https://static.wikia.nocookie.net/starwars/images/8/82/Nantex-class_fighters.png',
    60: 'https://static.wikia.nocookie.net/swg/images/e/ec/Grievous_Exclusive_Mount.jpg',
    62: 'https://static.wikia.nocookie.net/starwars/images/6/66/Fire_ship.jpg',
    67: 'https://static.wikia.nocookie.net/starwars/images/a/a0/DroidTrifighter-TCWs3BR2.png',
    69: 'https://static.wikia.nocookie.net/starwars/images/6/60/Wookieeflyingcat.jpg',
    70: 'https://static.wikia.nocookie.net/starwars/images/d/dc/Catamaran.jpg',
    71: 'https://static.wikia.nocookie.net/starwars/images/f/f7/JuggernautROTS.jpg',
    72: 'https://i.ytimg.com/vi/mYfYr-pjdqE/maxresdefault.jpg',
    73: 'https://static.wikia.nocookie.net/starwars/images/6/6d/DroidGunship-DB.png',
    76: 'https://static.wikia.nocookie.net/starwars/images/5/5c/AT-RT_BF2.png'
}

window.onload = async () => {
    try {
        await loadCharacters(currentPageUrl)
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadCharacters(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Limpar os resultados anteriores
    

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.filter((item) => item.name !== 'unknown').forEach((character) => {
            const card = document.createElement('div')
            card.style.backgroundImage = `url(${images[character.url.replace(/\D/g, "")]})`
            card.className = 'cards'

            const characterNameBG = document.createElement('div')
            characterNameBG.className = 'character-name-bg'

            const characterName = document.createElement('span')
            characterName.className = 'character-name'
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const exitButton = document.createElement('div')
                exitButton.className = 'exit-button'
                exitButton.innerText = 'X'

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage = `url(${images[character.url.replace(/\D/g, "")]})`
                characterImage.className = 'character-image'

                const name = document.createElement('span')
                name.className = 'character-details'
                name.innerText = `Nome: ${character.name}`

                const model = document.createElement('span')
                model.className = 'character-details'
                model.innerText = `Modelo: ${character.model}`

                const manufacturer = document.createElement('span')
                manufacturer.className = 'character-details'
                manufacturer.innerText = `Montadora: ${character.manufacturer}`

                const cost = document.createElement('span')
                cost.className = 'character-details'
                cost.innerText = `Preco: ${convertCost(character.cost_in_credits)}`
                
                const length = document.createElement('span')
                length.className = 'character-details'
                length.innerText = `Tamanho: ${convertLength(character.length)}`

                const speed = document.createElement('span')
                speed.className = 'character-details'
                speed.innerText = `Vel. maxima: ${convertSpeed(character.max_atmosphering_speed)}`

                const crew = document.createElement('span')
                crew.className = 'character-details'
                crew.innerText = `Tripulacao: ${character.crew}`

                const passengers = document.createElement('span')
                passengers.className = 'character-details'
                passengers.innerText = `Passageiros: ${character.passengers}`

                const cargo = document.createElement('span')
                cargo.className = 'character-details'
                cargo.innerText = `Capacidade: ${convertCargo(character.cargo_capacity)}`

                const consumables = document.createElement('span')
                consumables.className = 'character-details'
                consumables.innerText = `Consumiveis: ${convertConsumables(character.consumables)}`

                const classe = document.createElement('span')
                classe.className = 'character-details'
                classe.innerText = `Classe: ${character.vehicle_class}`

                modalContent.appendChild(exitButton)
                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(model)
                modalContent.appendChild(manufacturer)
                modalContent.appendChild(cost)
                modalContent.appendChild(length)
                modalContent.appendChild(speed)
                modalContent.appendChild(crew)
                modalContent.appendChild(passengers)
                modalContent.appendChild(cargo)
                modalContent.appendChild(consumables)
                modalContent.appendChild(classe)

            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? 'visible' : 'hidden'
        nextButton.style.visibility = responseJson.next? 'visible' : 'hidden'

        const pagesContainer = document.getElementById('pages-container')
        pagesContainer.innerText = `Pagina ${getPageID(url)} de ${Math.ceil(responseJson.count / 10)}`

        currentPageUrl = url

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar os personagens');
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior')
    }
}

function hideModal() {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

function getPageID(url) {
    if(url.length === 0) return null;
    const lastChar = url[url.length - 1];
    if(lastChar === 's') return 1;
    return lastChar
}

function convertCost(cost) {
    if (cost === "unknown" || cost === "n/a") return "desconhecido";
    return `R$ ${cost}`;
}

function convertLength(length) {
    if (length === "unknown" || length === "n/a") return "desconhecido";
    return `${length} m`;
}

function convertSpeed(speed) {
    if (speed === "unknown" || speed === "n/a") return "desconhecida";
    if (speed === "1000km") return "1000 km/h"
    return `${speed} km/h`;
}

function convertCargo(cargo) {
    if (cargo === "unknown" || cargo === "n/a") return "desconhecido";
    return `${cargo} ton`;
}

function convertConsumables(consumables) {
    if (consumables === "unknown" || consumables === "n/a") return "desconhecido";
    if (consumables === "none") return "nenhum"
    let con = consumables;
    con = con.replace('second', 'segundo')
    con = con.replace('minute',  'minuto')
    con = con.replace('hour', 'hora')
    con = con.replace('day',  'dia')
    con = con.replace('week',  'semana')
    con = con.replace('months',  'meses')
    con = con.replace('month',  'mes')
    con = con.replace('year',  'ano')
    
    return con;
}