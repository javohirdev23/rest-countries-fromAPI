import {
  elTemplateCard,
  elContainer,
  elSkeletonTemp,
  elLoader,
  elRegionInput,
  elSearchInput,
  elCard,
} from "./sourse.mjs";

// getOne
// https://restcountries.com/v3.1/name/uzbekistan

loader(true);
// main fetch to ui information
fetch(
  `https://restcountries.com/v3.1/independent?status=true&fields=languages,capital,flags,region,subregion,name,population`,
)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    ui(res);
  })
  .catch(() => {})
  .finally(() => {
    loader(false);
  });
// ui information sec
function ui(data) {
  elContainer.innerHTML = "";
  data.forEach((element) => {
    const clone = elTemplateCard.content.cloneNode(true);

    clone.querySelector(".name").innerText = element.name.common;

    clone.querySelector(".population").innerText = element.population
      ? element.population
      : "No data";
    clone.querySelector(".region").innerText = element.region
      ? element.region
      : "No data";
    clone.querySelector(".capital").innerText = element.capital
      ? element.capital
      : "No data";

    clone.querySelector("img").src = element.flags.svg;
    clone.querySelector("img").setAttribute("data-name", element.name.common);
    elContainer.appendChild(clone);
  });
}
// link to information sec
elContainer.addEventListener("click", (evt) => {
  let name = evt.target.getAttribute("data-name");

  if (name !== null) {
    location.href = `./information.html?name=${name}`;
  }
});

// filter by region
elRegionInput.addEventListener("change", (evt) => {
  let region = evt.target.value;
  getDataByRegion(region);
});
// filter by region function
function getDataByRegion(region) {
  fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then((res) => res.json())
    .then((res) => {
      ui(res);
    });
}
// search
elSearchInput.addEventListener("input", (evt) => {
  let nameCountr = evt.target.value.trim();
  if (nameCountr === "") {
    ui(res);
    return;
  }
  searchCountry(nameCountr);
});
// search function
function searchCountry(nameCountr) {
  fetch(`https://restcountries.com/v3.1/name/${nameCountr}`)
    .then((res) => res.json())
    .then((res) => {
      ui(res);
    });
}
// Loader skeleton
function loader(boolean) {
  elLoader.innerHTML = "";

  if (boolean) {
    Array.from({ length: 10 }, (_, index) => index).forEach(() => {
      elLoader.appendChild(elSkeletonTemp.cloneNode(true).content);
    });
  }
}
