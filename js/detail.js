import { elInfoTemp } from "./sourse.mjs";

fetch(
  "https://restcountries.com/v3.1/independent?status=true&fields=languages,capital,flags,region,subregion,name,population" +
    new URLSearchParams(location.search).get("capital"),
)
  .then((res) => res.json())
  .then((res) => {
    ui(res);
  })
  .catch(() => {})
  .finally(() => {});

function ui(data) {
  let clone = document.getElementById("infoTemplate").cloneNode(true).content;
  clone.querySelector("img").src = data.flags.svg;

  document.getElementById("infoBox").appendChild(clone);
}
