import { elInfoTemp, elTempInfoSkeleton, elLoader } from "./sourse.mjs";

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
  clone.querySelector(".population").innerText = data.population;
  clone.querySelector(".region").innerText = data.region;
  clone.querySelector(".subRegion").innerText = data.subregion;
  clone.querySelector(".capital").innerText = data.capital;
  clone.querySelector(".tld").innerText = data.tld;
  clone.querySelector(".languages").innerText = languages.join(", ");
  document.getElementById("infoBox").appendChild(clone);
}
