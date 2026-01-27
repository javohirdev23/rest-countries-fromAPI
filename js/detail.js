import {
  elInfoTemp,
  elTempInfoSkeleton,
  elLoader,
  elBorderBtn,
} from "./sourse.mjs";

let countryName = new URLSearchParams(location.search).get("name");
fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then((res) => res.json())
  .then((res) => {
    ui(res[0]);
  })
  .catch(() => {})
  .finally(() => {});

function ui(data) {
  let clone = document.getElementById("infoTemplate").cloneNode(true).content;
  const languages = Object.values(data.languages);
  clone.querySelector("img").src = data.flags.svg;
  clone.querySelector(".name").innerText = data.name.common;
  clone.querySelector(".nativeName").innerText = data.name.official;
  clone.querySelector(".population").innerText =
    data.population.toLocaleString();
  clone.querySelector(".region").innerText = data.region;
  clone.querySelector(".subRegion").innerText = data.subregion;
  clone.querySelector(".capital").innerText = data.capital;
  clone.querySelector(".tld").innerText = data.tld;
  clone.querySelector(".languages").innerText = languages.join(", ");
  if (data.borders) {
    data.borders.forEach((borerCountry) => {
      let span = document.createElement("span");
      span.innerText = borerCountry;

      span.style.padding = "5px 20px";
      span.style.background = "gray";
      span.style.cursor = "pointer";

      span.setAttribute("data-borderCountry", borerCountry);
      clone.querySelector(".borderBtnFather").appendChild(span);
    });
  } else {
    let span = document.createElement("span");
    span.innerText = "No border country";
    clone.querySelector(".borderBtnFather").appendChild(span);
  }
  clone.querySelector(".borderBtnFather").addEventListener("click", (evt) => {
    let name = evt.target.getAttribute("data-borderCountry");
    if (name !== null) {
      location.href = `./information.html?name=${name}`;
    }
  });
  document.getElementById("infoBox").appendChild(clone);
}
