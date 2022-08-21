let basket=JSON.parse(localStorage.getItem("data"))|| [];
console.log(basket)
let label =document.getElementById('label')
let shopping_cart=document.getElementById('shopping_cart')

let calculation=()=>{
  let cartitem=document.getElementById("cartamount")
  // here x and y are the two numbers x is the first number and y is the 2nd number
  cartitem.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
}
// this is for when we refresh the page the total remaind the smae
calculation()

let generateCart=()=>{
   if(basket.length !==0){
     return  shopping_cart.innerHTML=basket.map((x)=>{
      let {id,item}=x;
      let search=shopitemsData.find((y)=>y.id===id) || []
      let {img,name,price}=search
      return `<div class="cart_item">
      <img width=100 src=${img} alt="" />
      <div class="details">
      <div class="title-price-x">
      <h4 class="title-price">
      <p>${name}</p>
      <p class="cart-item-price">$ ${price}</p>
      </h4>
      <i onclick="removeitem(${id})" class="bi bi-x-lg"></i>
      </div>
      <div class="butons">
            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            <div id =${id}  class="quantity">${item}</div>
            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
      <h3>$ ${item*search.price}</h3>



      </div>
      </div>`
     }).join("")
   }
   else{
    shopping_cart.innerHTML=``
    label.innerHTML=`<h2>Cart is empty</h2>
    <a href="index.html">
    <button class="HomeBtn">Back to home</button>
    </a>`;
    
   }
}
generateCart();

let increment=(id)=>{
  let selecteditem=id;
  console.log(basket)
  // the purpose of search function is that it will find if item is alreday pesent in the cart 
  // or not if present then it will incrment it other wise add it to the cart
  let search=basket.find((y)=>y.id===selecteditem.id)
  if(search===undefined){
    basket.push({
      id:selecteditem.id,
      item:1,
    })
  }
  else{
    search.item +=1;
  }
  
  
  // console.log(basket)
  generateCart();
  update(selecteditem.id)
  localStorage.setItem("data",JSON.stringify(basket))
}
let decrement=(id)=>{
  let selecteditem=id;
  console.log(basket)
  // the purpose of search function is that it will find if item is alreday pesent in the cart 
  // or not if present then it will incrment it other wise add it to the cart
  let search=basket.find((y)=>y.id === selecteditem.id)
  if(search===undefined)return;
  else  if(search.item === 0) return;
  else{
    search.item -=1;
  }
  // console.log(basket)
  update(selecteditem.id)
  // when basket remains empty then to store nothin in local storage this function will help
    basket=basket.filter((x)=>x.item!==0)
    generateCart();
  localStorage.setItem("data",JSON.stringify(basket))

}
let update=(id)=>{
  let search=basket.find((x)=>x.id===id);
  console.log(search.item)
  document.getElementById(id).innerHTML=search.item
  calculation()
  totalAmount()
}
let removeitem=((id)=>{
  let seleecteditem=id;
  // console.log(seleecteditem.id)
  basket=basket.filter((x)=>x.id !== seleecteditem.id)
  
  generateCart();
  totalAmount();
  calculation()

  localStorage.setItem("data",JSON.stringify(basket))
})
let clearCart=()=>{
  basket=[]
  generateCart();
  calculation()
  localStorage.setItem("data",JSON.stringify(basket))
}

let totalAmount=()=>{
  if(basket.length !==0){
    let amount=basket.map((x)=>{
      let {item,id}=x;
      let search=shopitemsData.find((y)=>y.id===id) || [];
      return  item * search.price;

    }).reduce((x,y)=>x+y,0)
    console.log(amount)
    label.innerHTML=`<h2>Total Bill:$ ${amount}</h2>
    <button class="checkOut">CheckOut</button>
    <button onclick="clearCart()" class="removeall">Clear cart</button>`
  }
  else{

  }
}
totalAmount()