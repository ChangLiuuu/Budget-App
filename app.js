var bugetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            // create new ID
            if (data.allItems[type].length !== 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            // create new item based on type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //push it into our data structure
            data.allItems[type].push(newItem);

            //return the new element
            return newItem;
        },

        calculateBudget: function () {
            calculateTotal('exp');
            calculateTotal('inc');
            data.budget = data.totals.inc - data.totals.exp;
            data.percentage = data.totals

        },

        texting: function () {
            console.log(data);
        }
    };

})();


var UIController = (function () {

    var DOMstirngs = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        expensesContainer: '.expenses__list',
        incomeContainer: '.income__list'
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstirngs.inputType).value,
                description: document.querySelector(DOMstirngs.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstirngs.inputValue).value)
            };
        },


        addListItem: function (obj, type) {
            var html, newHtml, element;
            // create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstirngs.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            } else if (type === 'exp') {
                element = DOMstirngs.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">111%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }


            // replace the placeholder text with some actual text
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);


            // insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


        },

        clearFields: function () {
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstirngs.inputDescription + ',' + DOMstirngs.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (cur, index, array) {
                cur.value = "";

            });
            fieldsArr[0].focus();
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
    };


    var ctrlAddIterm = function () {
        var input, newItem;

        // 1.get the field input data
        input = UICtrl.getInput();
        //console.log(input);

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2.add the item to the budget controller
            newItem = bugetController.addItem(input.type, input.description, input.value);

            // 3.add the item to UI
            UICtrl.addListItem(newItem, input.type);

            // 4.clear input
            UICtrl.clearFields();


            // 5.calculate the budget
            budgetCtrl.calculateBudget()

            // 6.display the budget on the UI
        }


    };

    return {
        init: function () {
            console.log('Application has started.');
            return setupEventListeners();
        }
    };


})(bugetController, UIController);

controller.init();