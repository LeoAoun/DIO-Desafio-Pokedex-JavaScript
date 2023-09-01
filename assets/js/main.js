const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const filterSelect = document.getElementById("filterSelect");

const limit = 200;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit, selectedType = null) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const filteredPokemons = selectedType
      ? pokemons.filter((pokemon) => pokemon.types.includes(selectedType))
      : pokemons;

    const newHtml = filteredPokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

let selectedType = null; 

filterSelect.addEventListener("change", (event) => {
  selectedType = event.target.value;
  offset = 0; 
  pokemonList.innerHTML = ""; 
  loadPokemonItens(offset, limit, selectedType);
});

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  loadPokemonItens(offset, limit, selectedType); // Passe o filtro selecionado ao carregar mais pokémons
});

