let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const ADMIN_PASS = "trackow123";

function save(){
localStorage.setItem("products", JSON.stringify(products));
localStorage.setItem("cart", JSON.stringify(cart));
}

function render(list = products){
let box = document.getElementById("products");
box.innerHTML="";

list.forEach((p,i)=>{
box.innerHTML+=`
<div class="product">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>${p.price}€</p>
<button onclick="addToCart(${i})">В корзину</button>
</div>
`;
});
}

function filter(type){
if(type==="all") return render();
render(products.filter(p=>p.category===type));
}

function addProduct(){
products.push({
name:name.value,
price:price.value,
image:image.value,
category:category.value
});
save();
render();
}

function addToCart(i){
cart.push(products[i]);
save();
updateCart();
}

function updateCart(){
let box=document.getElementById("cartItems");
let total=0;

box.innerHTML="";

cart.forEach((p,i)=>{
total+=Number(p.price);

box.innerHTML+=`
<div>
${p.name} - ${p.price}€
<button onclick="removeItem(${i})">❌</button>
</div>
`;
});

document.getElementById("total").innerText=total+"€";
document.getElementById("cartCount").innerText=cart.length;
}

function removeItem(i){
cart.splice(i,1);
save();
updateCart();
}

function openCart(){
document.getElementById("cart").style.display="flex";
updateCart();
}

function closeCart(){
document.getElementById("cart").style.display="none";
}

function checkout(){
window.open("https://t.me/trackow_shop","_blank");
}

function openAdmin(){
document.getElementById("admin").style.display="flex";
}

function closeAdmin(){
document.getElementById("admin").style.display="none";
}

function login(){
if(pass.value === ADMIN_PASS){
loginBox.style.display="none";
adminPanel.style.display="block";
}
else alert("Неверный пароль");
}

function applyStyle(){
document.body.style.background = bg.value;
document.body.style.color = color.value;

localStorage.setItem("bg", bg.value);
localStorage.setItem("color", color.value);
}

window.onload=()=>{
render();

if(localStorage.getItem("bg")){
document.body.style.background = localStorage.getItem("bg");
document.body.style.color = localStorage.getItem("color");
}
};
