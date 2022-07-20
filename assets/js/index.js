const productSets = [
  {
    id: "1",
    title: "Red set",
    price: 50,
    discount5Percent: false,
  },
  {
    id: "2",
    title: "Green set",
    price: 40,
    discount5Percent: true,
  },
  {
    id: "3",
    title: "Blue set",
    price: 30,
    discount5Percent: false,
  },
  {
    id: "4",
    title: "Yellow set",
    price: 50,
    discount5Percent: false,
  },
  {
    id: "5",
    title: "Pink set",
    price: 80,
    discount5Percent: true,
  },
  {
    id: "6",
    title: "Purple set",
    price: 90,
    discount5Percent: false,
  },
  {
    id: "7",
    title: "Orange set",
    price: 120,
    discount5Percent: true,
  },
];

const cartLists = [];
let total = 0;
const totalPrice = document.getElementById("totalPrice");
totalPrice.innerHTML = "Total : " + total;

let isMember = false;

const checkMember = () => {
  isMember = memberCheck.checked;
  showTotal();
};

const memberCheck = document.getElementById("memberCheck");
memberCheck.addEventListener("click", checkMember);

const showTotal = () => {
  total = 0;
  cartLists.map((p) => {
    let sum = p.price * p.amount;
    if (p.discount5Percent && p.amount >= 2) {
      sum = sum - sum * 0.005;
    }
    total = total + sum;
  });

  if (isMember) {
    total = total - total * 0.1;
  }
  totalPrice.innerHTML = "Total : " + total;
};

const showLists = () => {
  const container = document.getElementById("cartListsContainter");
  container.innerHTML = "";
  cartLists.map((p) => {
    const title = document.createElement("p");
    title.innerText = p.title;
    const price = document.createElement("p");
    let sum = p.price * p.amount;
    if (p.discount5Percent && p.amount >= 2) {
      sum = sum - sum * 0.005;
    }
    // total = total + sum;
    price.innerText = "Price : " + p.price + " x " + p.amount + " = " + sum;
    const btn = document.createElement("button");
    btn.innerText = "Remove";
    btn.addEventListener("click", () => removeCart(p));
    const cartItem = document.createElement("div");
    cartItem.className = "cartItem";
    cartItem.appendChild(title);
    cartItem.appendChild(price);
    cartItem.appendChild(btn);
    container.appendChild(cartItem);
  });
};

const addCart = (p) => {
  const findIndex = cartLists.findIndex((item) => item.id == p.id);
  if (findIndex >= 0) {
    cartLists[findIndex].amount += 1;
  } else {
    p.amount = 1;
    cartLists.push(p);
  }
  showLists();
  showTotal();
};

const removeCart = (p) => {
  const findIndex = cartLists.findIndex((item) => item.id == p.id);
  if (findIndex >= 0) {
    cartLists.splice(findIndex, 1);
    showLists();
    showTotal();
  }
};

const container = document.getElementById("productListsContainter");
productSets.map((p) => {
  const title = document.createElement("p");
  title.innerText = p.title;
  const price = document.createElement("p");
  price.innerText = "Price : " + p.price;
  const btn = document.createElement("button");
  btn.innerText = "Add to Cart";
  btn.addEventListener("click", () => addCart(p));
  const productLists = document.createElement("div");
  productLists.className = "productLists";
  productLists.appendChild(title);
  productLists.appendChild(price);
  productLists.appendChild(btn);
  container.appendChild(productLists);
});
