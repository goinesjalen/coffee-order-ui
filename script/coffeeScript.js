
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

function resetCondiments(){
    // Reset all selections
    localStorage.setItem("condiments", JSON.stringify(""));
    localStorage.setItem("beverage", "");
}

async function receipt(){
    let host = "https://coffee-order-latest-qz6y.onrender.com";
    let message = "";
    let orderData = {beverage: localStorage.getItem("beverage"), 
                    condiments: JSON.parse(localStorage.getItem("condiments"))};
    console.log(JSON.stringify(orderData));

    let req = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    };

    try {
        let response = await fetch(host + "/orders", req);
        if (response.status == 201) {
                message = "Order Success:" + JSON.stringify(orderData);
            } 
    } catch (error) {
        message = "The following error occurred: " + error + "\n\nPlease try again or contact the customer support team";
    }
    console.log(message);
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

async function getReceipt() {
    let host = "https://coffee-order-latest-qz6y.onrender.com";
    let req = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    let url = host + "/orders";

    try {
        let response = await fetch(url, req);
        let result = await response.json();
        console.log(result);

        let receipt = document.getElementById("getReceipt");
        receipt.innerHTML = "";
        let title = document.createElement("h2");
        let titleVal = document.createTextNode("Order Placed:");
        title.appendChild(titleVal);
        receipt.appendChild(title);

        let id = document.createElement("h2");
        let idVal = document.createTextNode("Order id: " + result.id);
        id.appendChild(idVal);
        receipt.appendChild(id);

        let cond = document.createElement("h2");
        let condVal = document.createTextNode(result.description)
        cond.appendChild(condVal);
        receipt.appendChild(cond);

        let total = document.createElement("h2");
        let totalVal = document.createTextNode("Total: $" + result.cost);
        total.appendChild(totalVal);
        receipt.appendChild(total);

    } catch (error) {
        let message = "The following error occurred:\n" + error + "\n\nPlease try again or contact the customer support team";
        alert(message);
    }


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