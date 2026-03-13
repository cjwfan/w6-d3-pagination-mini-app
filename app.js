'use strict'

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


async function main() {
  try {
    const characters = getCharacterPage(
      "https://rickandmortyapi.com/api/character",
    );
    console.log(characters);
  } catch (error) {}
}

main();
