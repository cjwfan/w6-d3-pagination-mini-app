'use strict'

//state(must be in global scope for functions to access)
let currentPage = 1;
let totalPages = 0;

//step 1
async function getCharacterPage(url) {
    try {
        const res = await fetch(url);
        
    if (res.status === 429 || res.status === 403) {
    throw new Error("Rate limit exceeded");
}

          
        const data = await res.json();
        // console.log(data);
        return data;    //remove later??
    } catch (error) {
      console.error(error);
      document.getElementById("loadingMessage").textContent =
        "Too many requests. Please wait a moment.";
        
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

      outputDisplay.appendChild(p);
      outputDisplay.appendChild(img);
      }


    }

//step 4 
async function loadPage() {
 const url = `https://rickandmortyapi.com/api/character?page=${currentPage}`;

  try {
    const data = await getCharacterPage(url);
     if (!data) return; 
    
    totalPages = data.info.pages;

    console.log(data)
    renderCharacters(data.results);

    document.getElementById("loadingMessage").textContent =
      `Page ${currentPage} of ${totalPages}`;

    
  } catch (error) {
    console.error(error);
  }
}

//step 5
function setupButtons() {

  const next = document.querySelector("#next");
  const prev = document.querySelector("#prev");

  next.addEventListener("click", async () => {
    if (currentPage >= totalPages) return;
    currentPage++;
    console.log("Page:", currentPage);      //shows page in the console
    await loadPage();
  });

  prev.addEventListener("click", async () => {
    if (currentPage <= 1) return;
    currentPage--;
    console.log("Page:", currentPage);      
    await loadPage();
  });
  

}



//Step 2
async function main() {

    const loadingMessage =document.getElementById("loadingMessage");
    
  try {
    
    loadingMessage.textContent = "Loading..."

    await loadPage()
    loadingMessage.textContent = "";

    setupButtons()
  
    
  } catch (error) {
    console.error(error);
  }
}

main();
