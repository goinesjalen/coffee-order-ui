
// BEVERAGES
function setBeverage(buttonValue) {
    localStorage.setItem("beverage", buttonValue);
}

// CONDIMENTS
function addCondiment(buttonValue) {
    let condiments = JSON.parse(localStorage.getItem("condiments"))  || [];
    condiments.push(buttonValue); // Add the new condiment
    localStorage.setItem("condiments", JSON.stringify(condiments));
}
function removeCondiment(buttonValue) {
    let condiments = JSON.parse(localStorage.getItem("condiments"))  || [];
    const index = condiments.indexOf(buttonValue);
    if (index > -1) {
        condiments.splice(index, 1);
    } // Remove condiment
    localStorage.setItem("condiments", JSON.stringify(condiments));
}

function setElements() {
    // Creating drink buttons for the menu
    let order = document.getElementById("orderMenu");
    order.innerHTML = "";
    let bevLink = document.createElement("a");
    bevLink.setAttribute("href", "selectBeverage.html");
    let bevButton = document.createElement("button");
    let bevName = document.createTextNode(localStorage.getItem("beverage"));
    bevButton.appendChild(bevName);
    bevLink.appendChild(bevButton);
    order.appendChild(bevLink);
    console.log(localStorage.getItem("beverage"));

    // Creating condiment buttons for the menu
    for (let cond of JSON.parse(localStorage.getItem("condiments"))) {
        let conLink = document.createElement("a");
        conLink.setAttribute("href", "addCondiment.html");
        let conButton = document.createElement("button");
        let func = "removeCondiment('" + cond + "')";
        conButton.setAttribute("onclick", func);
        let conName = document.createTextNode(cond);
        conButton.appendChild(conName);
        conLink.appendChild(conButton);
        order.appendChild(conLink);
    }
    console.log(localStorage.getItem("condiments"));
}
 // If the orderMenu is present, load the elements.
 // addCondiment page
if (document.getElementById('orderMenu')) {
    window.onload = setElements;
}

function getReceipt() {
    let receipt = document.getElementById("getReceipt");
    receipt.innerHTML = "";
    let title = document.createElement("h2");
    let titleVal = document.createTextNode("Order Placed:");
    title.appendChild(titleVal);
    receipt.appendChild(title);

    // Grab order ID from Backend
    let id = document.createElement("h2");
    let idVal = document.createTextNode("Order id: ##WIP##");
    id.appendChild(idVal);
    receipt.appendChild(id);

    let cond = document.createElement("h2");
    let condiments = JSON.parse(localStorage.getItem("condiments"));
    let condStr = localStorage.getItem("beverage") + " with ";
    condStr = condStr.charAt(0).toUpperCase() + condStr.slice(1);
    let iterationCount = 0;
    for (let c of condiments) {
        iterationCount++;
        if (iterationCount == condiments.length){
            condStr += " and " + c
        }
        else {
            console.log(c.indexOf());
            condStr += c + ", "
        }
    } 
    let condVal = document.createTextNode(condStr + "!")
    cond.appendChild(condVal);
    receipt.appendChild(cond);

    // Grab order total from Backend
    let total = document.createElement("h2");
    let totalVal = document.createTextNode("Total: ##WIP##");

    total.appendChild(totalVal);
    receipt.appendChild(total);
}

if (document.getElementById('getReceipt')) {
    window.onload = getReceipt;
}