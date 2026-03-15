'use strict'

//step 1
async function getCharacterPage(url) {
    try {
        const res = await fetch(url);
        
          if (res.status !== 200) {
            throw new Error("Failed to fetch");
          }
        const data = await res.json();
        // console.log(data);
        return data;    //remove later??
    } catch (error) {
        console.error(error)
    }
      
}

//step 3
function renderCharacters (characters){
    const outputDisplay = document.getElementById("output")
    outputDisplay.textContent = "";
    //step 4 (image and name)
    for (const character of characters.slice(0,10)) {

      const p = document.createElement("p")
      p.textContent = character.name 
      const img = document.createElement("img");
      img.src = character.image 
      img.alt = character.name

      outputDisplay.appendChild(p)

      outputDisplay.appendChild(p);
      outputDisplay.appendChild(img);
      }


    }


   



//Step 2
async function main() {

    const loadingMessage =document.getElementById("loadingMessage");
    // const ouput = document.getElementById("output");
  try {
    loadingMessage.textContent = "Loading..."

    const characters = await getCharacterPage(
      "https://rickandmortyapi.com/api/character"
      
    );
    console.log(characters);
    renderCharacters(characters.results)
   
    
  } catch (error) {}
}

main();
