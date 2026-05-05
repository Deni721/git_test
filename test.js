"use strict";
let parent = document.querySelector("#parent");
let form = document.querySelector("#form");
let name = document.querySelector("#name");
let price = document.querySelector("#price");
let amount = document.querySelector("#amount");
let btn = document.querySelector("#add");
let table = document.querySelector("#table");
let total = document.querySelector("#total");
let rezult = document.querySelector("#rezult");

function createRowTable(tr, value, classAdd) {
  let td = document.createElement("td");
  td.textContent = value;
  td.classList.add(classAdd);
  return td;
}

function recountTotal() {
  // let cost=table.querySelectorAll('td');
  //  for (let elem of Array.from(cost)){
  //     if(elem.classList.contains('.cost')){
  //        sum+=Number(elem.textContent);
  //     }
  //  }
  let sum = 0;
  let cost = document.getElementsByClassName(".cost");
  for (let elem of cost) {
    sum += parseFloat(elem.textContent);
  }
  total.innerHTML = sum;
}

function AllowEdit(td) {
  td.addEventListener("dblclick", function () {
    let input = document.createElement("input");
    input.value = td.textContent;
    td.textContent = "";
    td.append(input);
    let costElem=input.parentElement.parentElement.lastElementChild.previousElementSibling;
    input.addEventListener("keypress", function (event) {
        if (event.code == "Enter") {
            td.textContent = input.value;

        }
        if (td.classList.contains('.price')){
         let neighBer=td.nextElementSibling;
         costElem.innerHTML=parseFloat(input.value)*parseFloat(neighBer.textContent); 
        }else if(td.classList.contains('.amount')){
             let neighBer=td.previousElementSibling;
             costElem.innerHTML=parseFloat(input.value)*parseFloat(neighBer.textContent);
        }
        
    });
  });
}

btn.addEventListener("click", function () {
  let tr = document.createElement("tr");
  let nameClick= createRowTable(tr, name.value, ".name") ;
  let priceClick=createRowTable(tr, price.value, ".price");
  let amountClick=createRowTable(tr, amount.value, ".amount");
  let costClick=createRowTable(tr, Number(amount.value) * Number(price.value), ".cost");
  let remove = createRowTable(tr, "удалить", ".remove");
  tr.append(nameClick,priceClick,amountClick,costClick,remove);
  
  remove.addEventListener("click", (event) => {
      remove.parentElement.remove();
      recountTotal();
    });
    
    table.append(tr);

  AllowEdit(nameClick);
  AllowEdit(priceClick);
  AllowEdit(amountClick);
  recountTotal();
});
