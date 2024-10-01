( async () => {
  const fs = require('fs');
  const pokemonIds = Array.from({ length: 151 }, (_, i) => i + 1);
  let fileContent = pokemonIds.map(id => `/pokemon/${id}`).join('\n');
  for(let index = 0; index < pokemonIds.length; index++) {
    fileContent += `\n/pokemons/page/${pokemonIds[index]}`;
  }

  const pokemonNameList = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => data.results.map(pokemon => pokemon.name));
  fileContent += '\n' + pokemonNameList.map(name => `/pokemon/${name}`).join('\n');
  
  fs.writeFileSync('prerender-routes.txt', fileContent);
})();
