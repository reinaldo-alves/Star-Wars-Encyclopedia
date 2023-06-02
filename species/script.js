let currentPageUrl = 'https://swapi.dev/api/species'

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

        responseJson.results.forEach((character) => {
            const card = document.createElement('div')
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/species/${character.url.replace(/\D/g, "")}.jpg')`
            card.className = 'cards'

            const characterNameBG = document.createElement('div')
            characterNameBG.className = 'character-name-bg'

            const characterName = document.createElement('span')
            characterName.className = 'character-name'
            characterName.innerText = `${convertName(character.name)}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/species/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = 'character-image'

                const name = document.createElement('span')
                name.className = 'character-details'
                name.innerText = `Nome: ${convertName(character.name)}`

                const classification = document.createElement('span')
                classification.className = 'character-details'
                classification.innerText = `Classificacao: ${translate(character.classification)}`

                const designation = document.createElement('span')
                designation.className = 'character-details'
                designation.innerText = `Designacao: ${translate(character.designation)}`

                const height = document.createElement('span')
                height.className = 'character-details'
                height.innerText = `Altura media: ${convertHeight(character.average_height)}`
                
                const skin = document.createElement('span')
                skin.className = 'character-details'
                skin.innerText = `Cor da pele: ${convertColor(character.skin_colors)}`

                const hair = document.createElement('span')
                hair.className = 'character-details'
                hair.innerText = `Cor do cabelo: ${convertColor(character.hair_colors)}`

                const eye = document.createElement('span')
                eye.className = 'character-details'
                eye.innerText = `Cor dos olhos: ${convertColor(character.eye_colors)}`

                const birth = document.createElement('span')
                birth.className = 'character-details'
                birth.innerText = `Expectativa de vida: ${convertBirthYear(character.average_lifespan)}`

                const language = document.createElement('span')
                language.className = 'character-details'
                language.innerText = `Idioma: ${convertLanguage(character.language)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(classification)
                modalContent.appendChild(designation)
                modalContent.appendChild(height)
                modalContent.appendChild(skin)
                modalContent.appendChild(hair)
                modalContent.appendChild(eye)
                modalContent.appendChild(birth)
                modalContent.appendChild(language)

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

function convertName(name) {
    if (name === "Human") return "Humano";
    if (name === "Yoda's species") return "Especie do Yoda";

    return name
}

function convertColor(color) {
    if (color === "n/a") return "nao se aplica"
    if (color === "none") return "nenhuma"

    let cor = color;
    cor = cor.replace("caucasian, black, asian, hispanic", "caucasiana, negra, asiatica, hispanica");
    cor = cor.replace("golden", "dourada");
    cor = cor.replace("white", "branca");
    cor = cor.replace("brown", "marrom");
    cor = cor.replace("dark", "escura");
    cor = cor.replace("grey", "cinza");
    cor = cor.replace("gray", "cinza");
    cor = cor.replace("unknown", "desconhecida");
    cor = cor.replace("green", "verde");
    cor = cor.replace("pale", "palida");
    cor = cor.replace("orange", "laranja"); 
    cor = cor.replace("red", "vermelha");
    cor = cor.replace("blue", "azul"); 
    cor = cor.replace("yellow", "amarela");
    cor = cor.replace("tan", "bronzeada");
    cor = cor.replace("blonde", "loiro");
    cor = cor.replace("blond", "loiro");
    cor = cor.replace("black", "preta");
    cor = cor.replace("pink", "rosa");
    cor = cor.replace("purple", "roxo");
    cor = cor.replace("peach", "pessego");
    cor = cor.replace("silver", "prateada");
    cor = cor.replace("hazel", "avela");
    cor = cor.replace("amber", "ambar");
  
    return cor;
}
  
function convertHeight(height) {
    if (height === "unknown") return "desconhecida";
    if (height === "n/a") return "nao se aplica"
    
    return (height / 100).toFixed(2) + ' m';
}
  
function convertBirthYear(birthYear) {
    if (birthYear === "unknown") return "desconhecida";
    if (birthYear === "indefinite") return "indefinida";
    if (birthYear === "n/a") return "nao se aplica";
    
    return `${birthYear} anos`;
}

function translate(item) {
    if (item === "unknown") return "desconhecida";
    if (item === "n/a") return "nao se aplica";
    if (item === "mammal") return "mamifero";
    if (item === "sentient") return "consciente";
    if (item === "reptilian") return "reptiliano";
    if (item === "gastropod") return "gastropode";
    if (item === "reptile") return "reptil";
    if (item === "amphibian") return "anfibio";
    if (item === "insectoid") return "insetoide";
    
    return item
}

function convertLanguage(language) {
    if (language === "unknown") return "desconhecido";
    if (language === "n/a") return "nao se aplica";
    if (language === "Galactic Basic") return "galatico basico";
    if (language === "Huttese") return "Huttes";
    if (language === "Ewokese") return "Ewokes";
    if (language === "Sullutese") return "Sullutes";
    if (language === "Dugese") return "Duges";
    if (language === "Xextese") return "Xextes";
    if (language === "Iktotchese") return "Iktotches";
    if (language === "Utapese") return "Utapes";
    if (language === "Gungan basic") return "Gungan basico";
    
    return language
}