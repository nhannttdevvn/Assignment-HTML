"use strict";

// Lấy dữ liệu từ localStorage
const petArrEdit = JSON.parse(getFromStorage("petArr")) || [];
const breedArrEdit = JSON.parse(getFromStorage("breedArr")) || [];

// DOM elements
const tableBodyElEdit = document.getElementById('tbody');
const breedInputEdit = document.getElementById("edit-breed");
const typeInputEdit = document.getElementById('edit-type');
const btnSave = document.getElementById('change-btn')

// Hiển thị bảng thú cưng
function renderTableDataEdit(petArr) {
  tableBodyElEdit.innerHTML = '';
  for (let i = 0; i < petArr.length; i++) {
    const pet = petArr[i];
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pet.id}</td>
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight} kg</td>
      <td>${pet.length} cm</td>
      <td>${pet.breed}</td>
      <td>
        <div style="width: 20px; height: 20px; background-color: ${pet.color}; margin: auto;"></div>
      </td>
      <td>${pet.vaccinated ? '✅' : '❌'}</td>
      <td>${pet.dewormed ? '✅' : '❌'}</td>
      <td>${pet.sterilized ? '✅' : '❌'}</td>
      <td>${pet.bmi || "?"}</td>
      <td>${pet.date}</td>
      <td><button class="btn btn-warning btn-sm" onclick="editPet('${pet.id}')">Edit</button></td>
    `;
    tableBodyElEdit.appendChild(row);
  }
}

function editPet(petId) {
  const pet = petArrEdit.find(p => p.id === petId);
  if (!pet) return;

  document.getElementById('main').classList.remove('d-none');

  // Gán giá trị vào form
  document.getElementById('edit-id').value = pet.id;
  document.getElementById('edit-name').value = pet.name;
  document.getElementById('edit-age').value = pet.age;
  document.getElementById('edit-type').value = pet.type;
  document.getElementById('edit-weight').value = pet.weight;
  document.getElementById('edit-length').value = pet.length;
  document.getElementById('edit-color-1').value = pet.color;
  document.getElementById('edit-vaccinated').checked = pet.vaccinated;
  document.getElementById('edit-dewormed').checked = pet.dewormed;
  document.getElementById('edit-sterilized').checked = pet.sterilized;

  // Lọc breed theo type và hiển thị
  const filteredBreeds = breedArrEdit.filter(b => b.type === pet.type);
  renderBreedForEdit(filteredBreeds);
  document.getElementById('edit-breed').value = pet.breed;
}

// Hiển thị danh sách breed theo type
function renderBreedForEdit(filteredBreedArr) {
  breedInputEdit.innerHTML = '<option>Select Breed</option>';
  filteredBreedArr.forEach(function (breed) {
    const option = document.createElement('option');
    option.textContent = breed.breed;
    option.value = breed.breed;
    breedInputEdit.appendChild(option);
  });
}

// Khi người dùng thay đổi Type thì lọc breed lại
typeInputEdit.addEventListener('change', function () {
  const selectType = typeInputEdit.value;
  const filteredBreeds = breedArrEdit.filter(b => b.type === selectType);
  renderBreedForEdit(filteredBreeds);
});

// Render bảng khi load trang
renderTableDataEdit(petArrEdit);

// Khi vừa load form, hiển thị danh sách breed theo type hiện tại (nếu có)
const currentType = typeInputEdit.value;
const filteredBreeds = breedArrEdit.filter(b => b.type === currentType);
renderBreedForEdit(filteredBreeds);


btnSave.addEventListener('click', function () {
  const data = {
    id: document.getElementById('edit-id').value,
    name: document.getElementById('edit-name').value.trim(),
    age: parseInt(document.getElementById('edit-age').value),
    color: document.getElementById('edit-color-1').value,
    breed: document.getElementById('edit-breed').value,
    type: document.getElementById('edit-type').value,
    weight: parseFloat(document.getElementById('edit-weight').value),
    length: parseFloat(document.getElementById('edit-length').value),
    vaccinated: document.getElementById('edit-vaccinated').checked,
    dewormed: document.getElementById('edit-dewormed').checked,
    sterilized: document.getElementById('edit-sterilized').checked,
    bmi: "?",
    date: new Date().toLocaleDateString('vi-VN'),
  };

  function validate(data) {
    if (!data.id || !data.name) {
      alert('Please enter ID and name.');
      return false;
    }

    if (isNaN(data.age) || data.age < 1 || data.age > 15) {
      alert('Age must be between 1 and 15.');
      return false;
    }

    if (data.type === "Select Type") {
      alert('Please select Type!');
      return false;
    }

    if (isNaN(data.weight) || data.weight < 1 || data.weight > 15) {
      alert('Weight must be between 1 and 15!');
      return false;
    }

    if (isNaN(data.length) || data.length < 1 || data.length > 100) {
      alert('Length must be between 1 and 100!');
      return false;
    }

    if (data.breed === "Select Breed") {
      alert('Please select Breed!');
      return false;
    }

    return true;
  }

  if (validate(data)) {
    const index = petArrEdit.findIndex(pet => pet.id === data.id);
    if (index !== -1) {
      petArrEdit[index] = data;
      saveToStorage('petArr', JSON.stringify(petArrEdit));
      renderTableDataEdit(petArrEdit); // <-- ⚠️ cập nhật lại bảng
      document.getElementById('main').classList.add('d-none'); // <-- ẩn form
      alert("Update successful!"); // <-- thêm thông báo
    }
  }
});
















