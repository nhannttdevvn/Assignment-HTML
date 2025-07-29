'use strict';

function saveDynamicDataToFile() {
  const petArr = JSON.parse(localStorage.getItem("petArr"));
  if (!petArr || petArr.length === 0) {
    alert("Không có dữ liệu để export.");
    return;
  }

  const petJson = JSON.stringify(petArr, null, 2);
  const blob = new Blob([petJson], {
    type: "application/json;charset=utf-8"
  });
  saveAs(blob, "pet-data.json");
}



function handleImport() {
  const fileInput = document.getElementById('input-file');
  const file = fileInput.files[0];

  if (!file) {
    alert('Vui lòng chọn file JSON');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const newPets = JSON.parse(e.target.result);

      if (!Array.isArray(newPets)) {
        alert('File không đúng định dạng mảng thú cưng');
        return;
      }

      const existingPets = JSON.parse(localStorage.getItem("petArr")) || [];

      // Gộp dữ liệu: ghi đè nếu trùng ID
      const petMap = {};
      existingPets.forEach(pet => petMap[pet.id] = pet);
      newPets.forEach(pet => petMap[pet.id] = pet);

      const mergedPets = Object.values(petMap);
      localStorage.setItem("petArr", JSON.stringify(mergedPets));

      alert("Import thành công!");
      fileInput.value = ''; // reset input
    } catch (err) {
      alert("Lỗi khi đọc file: " + err.message);
    }
  };

  reader.readAsText(file);
}
