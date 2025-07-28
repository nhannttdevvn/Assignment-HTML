"use strict";

const breedInputNew = document.getElementById("breed-input-new");
const typeInputNew = document.getElementById("type-input-new");
const submitBtnBreed = document.getElementById("submit-btn2");
const tableBodyElNew = document.getElementById("tbody-new");

const breedArrNew = JSON.parse(getFromStorage("breedArr")) || [];
console.log(breedArrNew)
submitBtnBreed.addEventListener("click", function () {
  const data = {
    breed: breedInputNew.value.trim(),
    type: typeInputNew.value,
  };
  console.log(data);

  function validate(data) {
    if (data.breed === "") {
      alert("Please enter breed.");
      return false;
    }

    const isDuplicate = breedArrNew.some((pet) => pet.breed === data.breed);
    if (isDuplicate) {
      alert("Breed must be unique!");
      return false;
    }

    if (data.type === "Select Type") {
      alert("Please select Type!");
      return false;
    }

    return true;
  }

  if (validate(data)) {
    breedArrNew.push(data);
    saveToStorage("breedArr", JSON.stringify(breedArrNew));
    clearInputBreed();
    renderBreedTable(breedArrNew);
  }
});

function renderBreedTable(arr) {
  tableBodyElNew.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const pet = arr[i];
    const option = document.createElement("tr");
    option.innerHTML = `
      <td>${i + 1}</td>
      <td>${pet.breed}</td>
      <td>${pet.type}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteBreed('${pet.breed}')">Delete</button></td>
    `;
    tableBodyElNew.appendChild(option);
  }
}

function clearInputBreed() {
  breedInputNew.value = "";
  typeInputNew.value = "Select Type";
}

function deleteBreed(breedName) {
  if (!confirm("Are you sure?")) return;
  const index = breedArrNew.findIndex((pet) => pet.breed === breedName);
  if (index !== -1) {
    breedArrNew.splice(index, 1);
    saveToStorage("breedArr", JSON.stringify(breedArrNew));
    renderBreedTable(breedArrNew);
  }
}

function renderBreed(arr) {
  arr.forEach(function (breed) {
    const option = document.createElement("option");
    option.textContent = breed.breed;
    option.value = breed.breed;
    breedInputNew.appendChild(option);
  });
}

renderBreedTable(breedArrNew);