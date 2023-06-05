let currentPageUrl = 'https://swapi.dev/api/starships'

const images = {
    2: 'https://i.pinimg.com/originals/43/54/d3/4354d36812bdd8049b6e4a0f1a34e3cc.jpg',
    3: 'https://lumiere-a.akamaihd.net/v1/images/Star-Destroyer_ab6b94bb.jpeg',
    5: 'https://static.wikia.nocookie.net/starwars/images/5/5b/Imperial_Sentinel-class_shuttle.png',
    9: 'https://static.wikia.nocookie.net/starwars/images/7/70/DSI-HDapproach.png',
    10: 'https://s2.glbimg.com/coHwdDkMeRVO9T2A_v1EIWLuHTE=/e.glbimg.com/og/ed/f/original/2019/08/27/31618033034_1dcde167ed_k.jpg',
    11: 'https://lumiere-a.akamaihd.net/v1/images/Y-Wing-Fighter_0e78c9ae.jpeg',
    12: 'https://p.turbosquid.com/ts-thumb/Zs/EGvWk6/WP2ajMyC/xwingtopleft_01_open_01/jpg/1444815293/600x600/fit_q87/f5523580da82b27186a787df4a5834587118442d/xwingtopleft_01_open_01.jpg',
    13: 'https://bbts1.azureedge.net/images/p/full/2021/01/0cbfc29f-020e-479d-98f4-18252af8a8fd.jpg',
    15: 'https://static.wikia.nocookie.net/starwars/images/3/30/Executor_BF2.png',
    17: 'https://static.wikia.nocookie.net/starwars/images/6/67/GR-75_Medium_Transport_TAEtrivia.png',
    21: 'https://static.wikia.nocookie.net/starwars/images/b/ba/Slave_I_DICE.png',
    22: 'https://lumiere-a.akamaihd.net/v1/images/veh_ia_1752_040381b2.jpeg',
    23: 'https://static.wikia.nocookie.net/starwars/images/7/71/NebulonB-SWS.png',
    27: 'https://lumiere-a.akamaihd.net/v1/images/e6d_ia_2581_47f64de7.jpeg',
    28: 'https://lumiere-a.akamaihd.net/v1/images/screen_shot_2015-05-26_at_5_16a39e17.png',
    29: 'https://static.wikia.nocookie.net/starwars/images/9/9f/B-wing-Squadronds.png',
    31: 'https://lumiere-a.akamaihd.net/v1/images/databank_republicattackcruiser_01_169_812f153d.jpeg',
    32: 'https://static.wikia.nocookie.net/starwars/images/0/0a/Lucrehulk-Battlefront-2-Render.png',
    39: 'https://i.redd.it/wzyg0gly4pp11.jpg',
    40: 'https://static.wikia.nocookie.net/starwars/images/9/9e/Naboo_Royal_Starship.png',
    41: 'https://static.wikia.nocookie.net/starwars/images/1/12/Sithinfiltrator-NEGVV.png',
    43: 'https://static.wikia.nocookie.net/starwars/images/2/2b/Royalcruiser.jpg',
    47: 'https://static.wikia.nocookie.net/starwars/images/c/c7/Aa9coruscantfreighter.jpg',
    48: 'https://static.wikia.nocookie.net/starwars/images/c/c9/Jedi_Starfighter_AotC.png',
    49: 'https://lumiere-a.akamaihd.net/v1/images/h-type-nubian-yacht_7d67bc00.jpeg',
    52: 'https://static.wikia.nocookie.net/starwars/images/7/70/Acclamator-TCWIV.png',
    58: 'https://static.wikia.nocookie.net/starwars/images/1/10/CountDookusSolarSailer-WotF.png',
    59: 'https://static.wikia.nocookie.net/battlefront/images/1/17/Providence-Class.png',
    61: 'https://static.wikia.nocookie.net/starwars/images/7/71/Theta.jpg',
    63: 'https://lumiere-a.akamaihd.net/v1/images/databank_republicattackcruiser_01_169_812f153d.jpeg',
    64: 'https://static.wikia.nocookie.net/starwars/images/7/73/Nabooskiff3-chron.jpg',
    65: 'https://lumiere-a.akamaihd.net/v1/images/1-1-starfighter_decf3188.jpeg',
    66: 'https://i.pinimg.com/originals/3a/6a/55/3a6a55d8e3f05882110dd3f14b86514b.jpg',
    68: 'https://swrpggm.com/wp-content/uploads/2021/02/Munificent_FE.png',
    74: 'https://i.pinimg.com/originals/bf/b3/bd/bfb3bd3b211349adb702f27448df43a2.png',
    75: 'https://static.wikia.nocookie.net/starwars/images/6/66/Nimbus-class_V-wing_TFOWM.png'
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
                classe.innerText = `Classe: ${character.starship_class}`

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