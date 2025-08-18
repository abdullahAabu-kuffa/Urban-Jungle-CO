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
      <td><img src="${p.image}" alt="${p.name}" width="50"></td>
      <td>${p.description}</td>
      <td class="actions">
        <i class="fa-solid fa-pencil edit-icon" onclick="editProduct(${i})"></i>
        <i class="fa-solid fa-trash delete-icon" onclick="deleteProduct(${i})"></i>
      </td>
    </tr>
  `).join("");

  localStorage.setItem("products", JSON.stringify(products));
}

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
      description: form[4].value
    };


    products.push(newProduct);
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
  form[4].value = p.description;

  //     Submit
  products.splice(index, 1);
  render();
}


render();
