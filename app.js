var bugetController = (function () {
   var x = 34;

   var add = function (a) {
       return x + a;
   };

   return {
       publicTest: function (b) {
           return add(b);
       }
   }

})();


var UIController = (function () {

    var DOMstirngs = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstirngs.inputType).value,
                description: document.querySelector(DOMstirngs.inputDescription).value,
                value: document.querySelector(DOMstirngs.inputValue).value

            };
        },

        getDOMstrings: function () {
            return DOMstirngs;
        }
    };


})();


var controller = (function (budgetCtrl, UICtrl) {


    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', function () {
            ctrlAddIterm();
        });

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which.keyCode === 13) {
                ctrlAddIterm();
            }
        });
    }



    var ctrlAddIterm = function () {

        // 1.get the field input data
        var input = UICtrl.getInput();
        console.log(input);

        // 2.add the item to the budget controller


        // 3.add the item to UI


        // 4.calculate the budget


        // 5.display the budget on the UI

    };

    return {
        init: function () {
            console.log('Application has started.');
            return setupEventListeners();
        }
    }


})(bugetController, UIController);

controller.init();