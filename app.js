(function () {
'use strict';
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListCheckOffService();

  list1.items = shoppingList.getItems();

  list1.itemName = "";
  list1.itemQuantity = "";

  shoppingList.displayItem(list1.itemName, list1.itemQuantity);

  list1.addList = function (itemIndex) {
    shoppingList.addList(itemIndex);
  };
}

// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListCheckOffService(5);

   list2.boughtitems = shoppingList.getItems2();

   list2.itemName = "";
   list2.itemQuantity = "";

   shoppingList.displayItem2(list2.itemName, list2.itemQuantity);
   //list1.addList = function (itemIndex) {
    // shoppingList.addList(itemIndex);
  // };

   list2.addList = function (itemIndex) {
     shoppingList.addList(itemIndex, 1);
  };
  //
  // list2.removeItem = function (itemIndex) {
  //   shoppingList.removeItem(itemIndex);
  // };
}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  var boughtitems = [];

 service.displayItem = function(itemName, itemquantity) {
   items.push({name: "cookies", quantity: 10 }, {name: "Bread", quantity: 8},
              {name: "Cake", quantity: 5}, {name: "Biscuit", quantity: 6}, {name: "Butter", quantity: 4});
 }

 service.displayItem2 = function(itemName, itemquantity) {
  //    boughtitems.push(items);
  if ((maxItems === undefined) ||
     (maxItems !== undefined) && (boughtitems.length < maxItems)) {
      var item = {
       name: itemName,
       quantity: itemquantity
      };
     boughtitems.push(items);
     return boughtitems;
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
   console.log(boughtitems);
 }

  service.removeList = function (itemIndex) {
      items.splice(itemIndex, 1);
  };



 service.addList = function (itemIndex) {
    items.splice(itemIndex, 1);
    //console.log(boughtitems);
    boughtitems.splice(0,0,items[itemIndex]);
return boughtitems;
    console.log(boughtitems);
 };

  service.getItems = function () {
    return items;
  };

  service.getItems2 = function () {
        return boughtitems;
  };

}


function ShoppingListCheckOffService() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
