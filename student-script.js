/*************************/
/**** Private Methods ****/
/*************************/

/*
 * Anything that you need for helper/private use should
 * go here.
 *
 */

/*************************/
/****    isis.Game    ****/
/*************************/

/* 
 * This function will be called when the user changes cities
 * 
 * User Story:
 * Whenever you move citites, the game will have to move the player to 
 * the new city and regenerate the items at that location.
 *
 * Hint:
 * Use this.refreshViews() to reload the UI.
 */

isis.Game.prototype.changeCity = function(newCity) {
  console.log('trying to change city to ' + newCity.name);
  this.currentCity = newCity;
  //console.log(this.currentCity);
  this.refreshViews();
}

/*
 * This function will be called when the user buys an item
 *
 * User Story:
 * A player can buy items in a city. Each item has a cost and can be 
 * bought in bulk.
 *
 * Hint:
 * Use prompt() and confirm() to get and valid user input
 */
isis.Game.prototype.buyItem = function(item) {
  console.log('trying to buy ' + item.name);
  this.buyingItem = item;
  
  var quantity = parseInt(prompt("What quantify of" + " " + item.name + " " + "do you want to purchase?"));
  var confirmation = confirm("are you surrrreee?");
  var totalPrice = quantity * item.currentPrice;
  var agentMoney = this.agent.money
  if (confirmation === true && agentMoney >= totalPrice) {
    agentMoney = agentMoney - totalPrice;
    this.agent.money = agentMoney;
    console.log(this.agent.inventory.push(item, quantity));}
  else { alert("You can't spend more than " + "$"+ agentMoney)
  }
}

/**
 * This function will be called when the user sells an item
 *
 * User Story:
 * A player can sell items in a city. Each item has a cost and can be 
 * sold in bulk.
 *
 * Hint:
 * Use prompt() and confirm() to get and valid user input
 * 
 * @params inventoryItem
 * An AgentInventoryItem which contains the info about the item the game
 * is trying to sell.
 */
isis.Game.prototype.sellItem = function(inventoryItem) {
  var value = inventoryItem.item.currentPrice * inventoryItem.quantity;
  console.log('trying to sell ' + inventoryItem.item.name + ', I have ' + inventoryItem.quantity + ' worth $' + value);
  var quantity = parseInt(prompt("how many do you want to sell?"))
  var totalPrice = quantity * inventoryItem.item.currentPrice
  var confirmation = confirm("are you sure?")
  var agentMoney = this.agent.money
  if (confirmation === true && quantity <= inventoryItem.quantity) {
      inventoryItem.quantity = (inventoryItem.quantity - quantity);
      agentMoney = agentMoney + totalPrice;
      this.agent.money = agentMoney;}
  else { alert("You only have" + quantity + " " + "available to sell.")
  }
}


/*
 * This function is called when the game is initialized to produce a list of bad
 * things which could happen to our travelling agent. 
 *
 * Make up a few more bad things that could happen to our agent!
 * A few examples:
 *   Customs Fare Hike (5% tax on all current money)
 *   Search & Seizure (-$5000)
 *
 * N.B.
 * The bad thing needs to follow the same format as the temporary bad thing
 */
isis.Game.prototype.initBadThings = function(badThings) {
//   badThings.push({
//     name: "Temporary bad thing!",
//     ohNoes: function(agent) {
//     alert("This is a demo bad thing, luckily nothing bad happened this time!");
//    }
//    });
  
  // Fill this one in with a new bad thing which could happen!
  // If you want, copy and paste it to make more bad things!
  badThings.push({
    name: "Bad things can happen",
    ohNoes: function(agent) {
      alert("OHMEEGA. A bird just shat on you. You need a new shirt - $100");
      console.log(agent.money);
      agent.money = agent.money - 100;
    }  
  });
  
  badThings.push({
    name: "Bad things can happen more than once",
    ohNoes: function(agent) {
      alert("You ate too much food, and now you need to buy tums - $5");
      console.log(agent.money);
      agent.money = agent.money - 5;
    }  
  });



}

/*************************/
/****    isis.Agent   ****/
/*************************/

/*
 * This method returns the player's rank based on the amount of 
 * money the player has.
 *
 * User Story:
 * If the player has less than $500 then they should be ranked as a 'Rookie'.
 * If the player has more than $500 then they should be ranked as an 'Agent'.
 * If the player has more than $1000 then they should be ranked as a 'Top Agent'.
 * If the player has more than $5000 then they should be ranked as a 'Double-0'.
 */
isis.Agent.prototype.getRank = function(item) { 
    if (this.money > 5000) {
    return 'Double-0';
  } else if (this.money > 1000) {
    return 'Top Agent';
  } else if (this.money > 500) {
    return 'Agent';
  } else {
    return 'Rookie';
  }
}

/*
 * This will initialize the agent for your player. Make sure to change
 * this so that you collect the information from the user instead of
 * hard coding it.
 * 
 * Hint:
 * Use prompt() to get user input.
 */
isis.Agent.prototype.init = function(item) { 
  this.name = prompt("Wus your name?"); // This should be set by the user
  this.codename = prompt("Wus your code name?"); // This too
}



// This runs the game, this HAS to be at the 
// bottom of the file!
$(function() {
  setTimeout(function() {
    isis.init();
  }, 250);
});