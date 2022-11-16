console.log("ES6");

//object properties shorthand
const name="mohit";
const userAge=22;

const user = {
    name,
    Age : userAge,
    Location: 'Indore,MP'
}
console.log(user);

//object destructuring

const product = {
    label: "Black Book",
    price: "120 Rs",
    stoke: "120",
    salePrice: "undefined"
}

const {label:productLabel, price} = product;
console.log(productLabel);

const transection = (type, {price}) => {
  console.log(price);
}

transection('order',product)