let title = document.getElementById("title");
let price = document.getElementById("price");
let texts = document.getElementById("texts");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let clear = document.getElementById("clear");
let search = document.getElementById("search");
let searchtitle = document.getElementById("searchtitle");
let searchcategory = document.getElementById("searchcategory");
let tbody = document.querySelector("#tbody");

let mood = "create";
let getTotal = () => {
  if (price.value != "") {
    let totalPrice = +price.value + +texts.value + +ads.value - +discount.value;
    total.innerHTML = totalPrice;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
};
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
let shwoButtonClear = () => {
  if (dataPro.length <= 1) {
    clear.style.display = "none";
  } else {
    clear.style.display = "block";
    clear.innerHTML = `clear (${dataPro.length})`;
  }
};
let index;

submit.onclick = () => {
  let data = {
    title: title.value,
    price: price.value,
    texts: texts.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (mood === "create") {
    if (data.title === "" || data.price === "" || data.count === "") {
      Swal.fire("please fill the fields");

      return;
    }
    if (data.count > 1) {
      for (let i = 0; i < data.count; i++) {
        dataPro.push(data);
      }
    } else {
      dataPro.push(data);
    }
    Toastify({
      text: "The operation successful",
      duration: 3000,
    }).showToast();
  } else {
    dataPro[index].title = data.title;
    dataPro[index].category = data.price;
    dataPro[index].price = data.price;
    dataPro[index].ads = data.ads;
    dataPro[index].texts = data.texts;

    submit.innerHTML = "create";
    mood = "create";
    count.style.display = "block";
  }
  localStorage.setItem("product", JSON.stringify(dataPro));
  console.log(dataPro);
  clearData();
  shwoData();
};
console.log(dataPro[index]);

let clearData = () => {
  title.value = "";
  price.value = "";
  texts.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
};

let shwoData = () => {
  let allData = "";
  for (let i = 0; i < dataPro.length; i++) {
    allData += `
          <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateItem(${[
            i,
          ]})"  id="update">update</button></td>
          <td><button onclick="deleteItem(${[
            i,
          ]})" id="delete">delete</button></td>
          </tr>  `;
  }
  tbody.innerHTML = allData;
  shwoButtonClear();
  getTotal();
};

let updateItem = (itemId) => {
  index = itemId;
  let curruntInput = dataPro[itemId];
  title.value = curruntInput.title;

  price.value = curruntInput.price;
  ads.value = curruntInput.ads;
  category.value = curruntInput.category;
  discount.value = curruntInput.discount;

  count.style.display = "none";
  mood = "update";
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
  shwoData();
  submit.innerHTML = "update";
  getTotal();
};
console.log(mood);
shwoData();
let deleteItem = (itemId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        a: dataPro.splice(itemId, 1),
        b: (localStorage.product = JSON.stringify(dataPro)),

        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        c: shwoData(),
      });
    }
  });
};
clear.onclick = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        x: (dataPro = []),
        z: localStorage.clear(),
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        a: shwoData(),
      });
    }
  });
};
let searchMood = "title";
let searchFn = (id) => {
  if (id === "searchtitle") {
    searchMood = "title";
    search.placeholder = "search by title";
  } else {
    searchMood = "category";
    search.placeholder = "search by category";
  }
  search.value = "";
  search.focus();
  shwoData();
};

let handleSearch = (value) => {
  let allData = "";
  if (searchMood === "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.toLowerCase().includes(value)) {
        allData += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateItem(${[
          i,
        ]})"  id="update">update</button></td>
        <td><button onclick="deleteItem(${[
          i,
        ]})" id="delete">delete</button></td>
        </tr>  `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.toLowerCase().includes(value)) {
        allData += `
          <tr>
          <td>${i}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].discount}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateItem(${[
            i,
          ]})"  id="update">update</button></td>
          <td><button onclick="deleteItem(${[
            i,
          ]})" id="delete">delete</button></td>
          </tr>  `;
      }
    }
  }
  tbody.innerHTML = allData;
};
