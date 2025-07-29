"use strict";

// Lấy dữ liệu từ LocalStorage
const breedArrSearch = JSON.parse(getFromStorage("breedArr")) || [];
const petArrSearch = JSON.parse(getFromStorage("petArr")) || [];

// DOM Elements
const breedInputSearch = document.getElementById("search-breed");
const breedTypeSearch = document.getElementById("search-type");
const btnSearch = document.getElementById("search-btn");

// Render danh sách giống theo loại
function renderBreedForSearch(filteredBreedArr) {
  breedInputSearch.innerHTML = '<option>Select Breed</option>';
  filteredBreedArr.forEach(function (breed) {
    const option = document.createElement("option");
    option.textContent = breed.breed;
    option.value = breed.breed;
    breedInputSearch.appendChild(option);
  });
}

// Khi thay đổi loại (Dog/Cat) thì cập nhật danh sách giống
breedTypeSearch.addEventListener("change", function () {
  const selectedType = breedTypeSearch.value;
  const filteredBreeds = breedArrSearch.filter((b) => b.type === selectedType);
  renderBreedForSearch(filteredBreeds);
});

// Xử lý khi nhấn nút "Find"
btnSearch.addEventListener("click", function () {
  const idValue = document.getElementById("search-id").value.trim().toLowerCase();
  const nameValue = document.getElementById("search-name").value.trim().toLowerCase();
  const typeValue = document.getElementById("search-type").value;
  const breedValue = document.getElementById("search-breed").value;
  const vaccinatedChecked = document.getElementById("search-vaccinated").checked;
  const dewormedChecked = document.getElementById("search-dewormed").checked;
  const sterilizedChecked = document.getElementById("search-sterilized").checked;

  // Lọc dữ liệu theo tiêu chí người dùng nhập
  const filteredPets = petArrSearch.filter((pet) => {
    if (idValue && !pet.id.toLowerCase().includes(idValue)) return false;
    if (nameValue && !pet.name.toLowerCase().includes(nameValue)) return false;
    if (typeValue !== "Select Type" && pet.type !== typeValue) return false;
    if (breedValue !== "Select Breed" && pet.breed !== breedValue) return false;
    if (vaccinatedChecked && !pet.vaccinated) return false;
    if (dewormedChecked && !pet.dewormed) return false;
    if (sterilizedChecked && !pet.sterilized) return false;
    return true;
  });
  if (filteredPets.length === 0) {
    alert("Không tìm thấy thú cưng phù hợp!");
    return; // Dừng không render dữ liệu mới => giữ kết quả cũ
  }

  // Hiển thị danh sách kết quả
  renderTableDataForSearch(filteredPets);
});

// Hàm hiển thị bảng kết quả
function renderTableDataForSearch(petArr) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pet.id}</td>
      <td>${pet.name}</td>
      <td>${pet.type}</td>
      <td>${pet.breed}</td>
      <td>${pet.vaccinated ? "✅" : "❌"}</td>
      <td>${pet.dewormed ? "✅" : "❌"}</td>
      <td>${pet.sterilized ? "✅" : "❌"}</td>
    `;
    tbody.appendChild(row);
  });
}
