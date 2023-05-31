let currentPageUrl = 'https://swapi.dev/api/people'

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
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
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

                const characterImage = document.createElement('div')
                characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`
                characterImage.className = 'character-image'

                const name = document.createElement('span')
                name.className = 'character-details'
                name.innerText = `Nome: ${character.name}`

                const height = document.createElement('span')
                height.className = 'character-details'
                height.innerText = `Altura: ${convertHeight(character.height)}`

                const mass = document.createElement('span')
                mass.className = 'character-details'
                mass.innerText = `Peso: ${convertMass(character.mass)}`

                const hair = document.createElement('span')
                hair.className = 'character-details'
                hair.innerText = `Cor do cabelo: ${convertHairColor(character.hair_color)}`
                
                const skin = document.createElement('span')
                skin.className = 'character-details'
                skin.innerText = `Pele: ${convertSkinColor(character.skin_color)}`

                const eye = document.createElement('span')
                eye.className = 'character-details'
                eye.innerText = `Cor dos olhos: ${convertEyeColor(character.eye_color)}`

                const birth = document.createElement('span')
                birth.className = 'character-details'
                birth.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`

                const gender = document.createElement('span')
                gender.className = 'character-details'
                gender.innerText = `Genero: ${convertGender(character.gender)}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(height)
                modalContent.appendChild(mass)
                modalContent.appendChild(hair)
                modalContent.appendChild(skin)
                modalContent.appendChild(eye)
                modalContent.appendChild(birth)
                modalContent.appendChild(gender)

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
    if(lastChar === 'e') return 1;
    return lastChar
}

function convertEyeColor(eyeColor) {
    if (eyeColor === "blue-gray") return "azul/cinza"
    
    const colors = {
      blue: "azul",
      brown: "castanho",
      green: "verde",
      yellow: "amarelo",
      black: "preto",
      pink: "rosa",
      red: "vermelho",
      orange: "laranja",
      hazel: "avela",
      unknown: "desconhecida"
    };
  
    return colors[eyeColor.toLowerCase()] || eyeColor;
}
  
function convertHeight(height) {
    if (height === "unknown") {
      return "desconhecida";
    }
    
    return (height / 100).toFixed(2) + ' m';
}
  
function convertMass(mass) {
    if (mass === "unknown") {
      return "desconhecido";
    }
    
    return `${mass} kg`;
}
  
function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
      return "desconhecido";
    }
    
    return birthYear;
}

function convertGender(gender) {
    if (gender === "n/a" || gender === "none") {
        return "desconhecido"
    }
    
    const genders = {
      male: "masculino",
      female: "feminino",
    };
  
    return genders[gender.toLowerCase()] || gender;
}

function convertHairColor(hairColor) {
    if (hairColor === "n/a") return "desconhecida"
    if (hairColor === "brown, grey") return "castanho/cinza"
    if (hairColor === "auburn, white") return "ruivo/branco"
    if (hairColor === "auburn, grey") return "ruivo/cinza"
    
    const colors = {
      none: "sem cabelo",
      blond: "loiro",
      blonde: "loiro",
      brown: "castanho",
      black: "preto",
      white: "branco",
      grey: "cinza",
      auburn: "ruivo"
    };
  
    return colors[hairColor.toLowerCase()] || hairColor;
}

function convertSkinColor(skinColor) {
    if (skinColor === "white, blue") return "branca/azul"
    if (skinColor === "white, red") return "branca/vermelha"
    if (skinColor === "green-tan, brown") return "marrom esverdeada"
    if (skinColor === "brown mottle") return "com manchas marrons"
    if (skinColor === "mottled green") return "verde manchado"
    if (skinColor === "blue, grey" || skinColor === "grey, blue") return "cinza/azul"
    if (skinColor === "grey, red") return "cinza/vermelha"
    if (skinColor === "grey, green, yellow") return "cinza/verde/amarela"
    if (skinColor === "fair, green, yellow") return "clara/verde/amarela"
    if (skinColor === "silver, red") return "prateada/vermelha"
    if (skinColor === "green, grey") return "verde/cinza"
    if (skinColor === "red, blue, white") return "vermelha/azul/branca"
    if (skinColor === "brown, white") return "marrom/branca"

    const colors = {
      fair: "clara",
      gold: "dourada",
      white: "branca",
      light: "clara",
      brown: "marrom",
      dark: "escura",
      grey: "cinza",
      unknown: "cor desconhecida",
      green: "verde",
      pale: "palida",
      metal: "metalica",
      orange: "laranja", 
      red: "vermelha",
      blue: "azul", 
      yellow: "amarela",
      tan: "bronzeada"
    };
  
    return colors[skinColor.toLowerCase()] || skinColor;
}