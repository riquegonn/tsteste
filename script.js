"use strict";
const container = document.querySelector(".container");
const botao = document.querySelector(".botao");
const pageOne = "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";
(function resetPage() {
    window.localStorage.removeItem("next-page");
})();
const newPage = (value) => window.localStorage.setItem("next-page", value);
async function getData() {
    let pageAtual = window.localStorage
        .getItem("next-page")
        ?.replace("", "https://");
    const urlFetch = pageAtual ? pageAtual : pageOne;
    const promise = await fetch(urlFetch);
    const json = await promise.json();
    const { products, nextPage } = json;
    newPage(nextPage);
    const containerLi = document.querySelectorAll(".container-li");
    if (containerLi.length < 100) {
        fetchContent(products);
    }
    else {
        botao?.classList.add("remove");
        const newMsg = document.querySelector(".msg");
        if (newMsg) {
            newMsg.classList.add("active");
        }
    }
}
getData();
function isData(value) {
    if (value &&
        typeof value === "object" &&
        "name" in value &&
        "description" in value &&
        "oldPrice" in value &&
        "price" in value) {
        return true;
    }
    else {
        return false;
    }
}
function fetchContent(data) {
    if (Array.isArray(data)) {
        data.filter(isData).map(({ name, description, oldPrice, price }) => {
            if (container) {
                container.innerHTML += `<li class="container-li">
        <h1>Nome: ${name}</h1>
        <p>${description}</p>
        <p>De: R$${oldPrice},00</p>
        <p>Por: R$${price},00</p>
        </li>
        `;
            }
        });
    }
    else {
        throw "O retorno dessa promise não é uma Array.";
    }
}
botao?.addEventListener("click", getData);
