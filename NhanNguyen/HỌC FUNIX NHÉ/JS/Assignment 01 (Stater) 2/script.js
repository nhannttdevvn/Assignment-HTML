'use strict';
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const breedArr = JSON.parse(getFromStorage("breedArr", "[]"));

const tableBodyEl = document.getElementById('tbody');

const petArr = JSON.parse(getFromStorage("petArr","[]"));


submitBtn.addEventListener('click', function () {
  const data = { 
    id: idInput.value.trim(),
    name: nameInput.value.trim(),
    age: parseInt(ageInput.value), 
    color: colorInput.value,
    breed: breedInput.value,
    type: typeInput.value,
    weight: parseFloat(weightInput.value),         
    length: parseFloat(lengthInput.value),
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
    date: new Date().toLocaleDateString('vi-VN'),
  }


  function validate(data) {
    if (!data.id || !data.name) {
      alert('Please enter ID and name.');
      return false;
    }
  
    const isDuplicate = petArr.some(pet => pet.id === data.id);
    if (isDuplicate) {
      alert('ID must be unique!');
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

  

  if(validate(data)){
    petArr.push(data)
    saveToStorage("petArr", JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
  }
});

function renderTableData(petArr){
  tableBodyEl.innerHTML='';
  for(let i = 0; i<petArr.length; i++){
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
      <div style = "width:20px; height:20px;  background-color:${pet.color}; margin:auto; "></div>
    </td>
    <td>${pet.vaccinated ?  '✅': '❌'}</td>
    <td>${pet.dewormed ? '✅': '❌'}</td>
    <td>${pet.sterilized ? '✅': '❌'}</td>
    <td>${pet.bmi || "?"}</td>
    <td>${pet.date}</td>
    <td><button class="btn btn-danger btn-sm" onclick="deletePet('${pet.id}')">Delete</button></td>

    `;
    tableBodyEl.appendChild(row);
  }
}



const clearInput = () => {
	idInput.value = ''
  nameInput.value = '';
  ageInput.value = '';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '#000000';
  typeInput.value = 'Select Type';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
	
}


function deletePet(petId){
  if (!confirm('Are u sure?')) return;
  const index = petArr.findIndex(pet => pet.id ===  petId );
    if(index !== -1){
      petArr.splice(index,1);
      saveToStorage("petArr", JSON.stringify(petArr));
      renderTableData(petArr);
    }
}


let healthyCheck = false;

const healthyBtn = document.getElementById("healthy-btn");
healthyBtn.addEventListener("click", function(){
  if(!healthyCheck){
    const healthyPetArr = petArr.filter(function(pet){
      return pet.vaccinated && pet.dewormed && pet.sterilized;
    });
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet"; 
    healthyCheck = true;
    

    // const healthyPetArr = [];
    // for (let i =0; i<petArr.length;i++){
    //   const pet = petArr[i];
    //   if(pet.vaccinated ===true & pet.dewormed === true && pet.sterilized ===true){
    //     healthyPetArr.push(pet);
    //   }
    // }

  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;
  }
})



const bmiBtn = document.getElementById("bmi-btn");
bmiBtn.addEventListener("click", function(){
  for (let i = 0; i<petArr.length; i++){
    const pet = petArr[i];
    if(pet.type ==="Dog"){
      pet.bmi = ((pet.weight * 703) / (pet.length * pet.length)).toFixed(2);
    } else if (pet.type ==="Cat"){
      pet.bmi = ((pet.weight * 886) / (pet.length * pet.length)).toFixed(2);
    }
  }
  renderTableData(petArr); 
})

function renderBreed(breedArr){
  breedInput.innerHTML = '<option>Select Breed</option>'; 

  breedArr.forEach(function(breed){
    const option = document.createElement('option');
    option.textContent = breed.breed;
    option.value = breed.breed;
    breedInput.appendChild(option);
  })
}

typeInput.addEventListener('change', function(){
  const selectType = typeInput.value;
  const filteredBreeds = breedArr.filter(b => b.type === selectType)
  renderBreed(filteredBreeds);
})
renderTableData(petArr); 



