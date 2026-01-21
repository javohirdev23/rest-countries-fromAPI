import {
  elTemplateCard,
  elContainer,
  elSkeletonTemp,
  elLoader,
} from "./sourse.mjs";

loader(true);
fetch(
  `https://restcountries.com/v3.1/independent?status=true&fields=languages,capital,flags,region,subregion,name,population`,
)
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    // ui(res);
    setTimeout(() => {
      ui(res);
    }, 1000);
  })
  .catch(() => {})
  .finally(() => {
    loader(false);
  });

function ui(data) {
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

    elContainer.appendChild(clone);
  });
}

elContainer.addEventListener("click", () => {
  location.href = "../inform.html/information.html";
});

// Loader skeleton

function loader(boolean) {
  elLoader.innerHTML = "";

  if (boolean) {
    Array.from({ length: 100 }, (_, index) => index).forEach(() => {
      elLoader.appendChild(elSkeletonTemp.cloneNode(true).content);
    });
  }
}
