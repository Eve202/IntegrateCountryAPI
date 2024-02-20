let countries = [];
const countriesContainer = document.querySelector('.countries-container');
const inputSearch = document.getElementById('inputSearch');
const inputRange = document.getElementById('inputRange');
const rangeValue = document.getElementById('rangeValue');
const btnSort =document.querySelectorAll('.btnSort');
let numbersCountry = 24;


async function fetchCountries() {
    await fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => countries = data )
}

function filterCountry(country) {
    return country.name.official.includes(inputSearch.value) ;
}

function triCountry(typeTry,theCountries) {
    let list                                                  
}

function displaysCountries(sortCountry = 'alpha') {
    let listCountry = [],statistics = [];
    if (inputSearch.value) {
         listCountry = countries.filter((country )=> filterCountry(country));                                                            
    } else {
        listCountry = countries;
    }
    console.log(sortCountry)
    switch (sortCountry) {
         case 'minToMax':
            listCountry = listCountry.sort((a,b) => a.population - b.population);
            break;
        case 'maxToMin':
            listCountry = listCountry.sort((a,b) => b.population - a.population);
            break;
        case 'alpha':
            listCountry = listCountry.sort((a,b) => a.name.common.localeCompare(b.name.common));
             break;
         default:
             break;
     }
    countriesContainer.innerHTML = listCountry.slice(0,numbersCountry).map((country) => {
       

        return (`<div class="country">
                <div class="flags">
                    <img src=${country.flags.svg} alt="Drapeau de ${country.name.common}"  >
                </div>
                <h2>${country.name.common}</h2>
                <h3>${country.capital}</h3>
                <p>Population : ${country.population}</p>
            </div>
            `);
    });
    
}
window.addEventListener('load', fetchCountries().then(() => displaysCountries()));

inputSearch.addEventListener('input', (e) => {
        displaysCountries();
});

 inputRange.addEventListener('input', (e) => {
    rangeValue.textContent = e.target.value;
    numbersCountry = parseInt(rangeValue.textContent);
    displaysCountries();
 });

btnSort.forEach(btn => {
    btn.addEventListener('click', (e) => {
        displaysCountries(e.target.id);
    });
});