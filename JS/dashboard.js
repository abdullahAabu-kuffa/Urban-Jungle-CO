const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});


const form = document.querySelector(".form-section form");
const tableBody = document.querySelector(".table-Products tbody");

// localStorage 
let products = JSON.parse(localStorage.getItem("products")) || [];

// render products in table
function render() {
  tableBody.innerHTML = products.map((p, i) => `
    <tr>
      <td>${p.name}</td>
      <td>$${p.price}</td>
      <td>${p.category}</td>
      <td><img src="../${p.image}" alt="${p.name}" width="80"></td>
      <td>${p.quantity}</td>
      <td ><div class="description-input">${p.description}</div></td>
      <td class="actions">
        <i class="fa-solid fa-pencil edit-icon" onclick="editProduct(${i})"></i>
        <i class="fa-solid fa-trash delete-icon" onclick="deleteProduct(${i})"></i>
      </td>
    </tr>
  `).join("");

  localStorage.setItem("products", JSON.stringify(products));
}

document.addEventListener("DOMContentLoaded", () => {
  const descriptionInput = document.querySelector(".input-description");
  if (!descriptionInput) return;

  // Set default description
  descriptionInput.value = "It is adding a calm and serene atmosphere. Easy to care for and grows beautifully indoors or outdoors.";
});

// add new product
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const file = form[3].files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const newProduct = {
      name: form[0].value,
      price: form[1].value,
      category: form[2].value,
      image: event.target.result,
      quantity: form[4].value,
      description: form[5].value
    };


    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    render();
    form.reset();
  }
  reader.readAsDataURL(file);
});

// delete product
function deleteProduct(index) {
  products.splice(index, 1);
  render();
}

// edit product
function editProduct(index) {
  const p = products[index];
  form[0].value = p.name;
  form[1].value = p.price;
  form[2].value = p.category;
  form[4].value = p.quantity;
  form[5].value = p.description;

  //     Submit
  products.splice(index, 1);
  render();
}


render();

// search
const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();


  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value) ||
    p.category.toLowerCase().includes(value)
  );


  tableBody.innerHTML = filtered.map((p, i) => `
    <tr>
      <td>${p.name}</td>
      <td>$${p.price}</td>
      <td>${p.category}</td>
      <td><img src="${p.image}" alt="${p.name}" width="50"></td>
      <td>${p.quantity}</td>
      <td>${p.description}</td>
      <td class="actions">
        <i class="fa-solid fa-pencil edit-icon" onclick="editProduct(${i})"></i>
        <i class="fa-solid fa-trash delete-icon" onclick="deleteProduct(${i})"></i>
      </td>
    </tr>
  `).join("");
});


