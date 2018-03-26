var totalIncome = 0
var totalExpense = 0
var balance = 0
var expenseRate
var localRate
var expList

var state = {

    transaction: [],

}
var transaction = function (props) {
    this.transacType = props.type,
        this.description = props.description,
        this.amount = props.amount

}

transaction.prototype = {

    add: function () {
        state.transaction.unshift(this)
        check_push_item(state.transaction, push)
        console.log(state.transaction)
        btnRemove = document.querySelectorAll('.remove')
        btnRemove.forEach(el => {
            el.onclick = function (event) {
                console.log('you delete element')
                state.transaction[(Number(event.target.dataset.key))].remove(Number(event.target.dataset.key))

            }
        })

    },

    remove: function (key) {
        state.transaction.splice(key, 1)
        check_push_item(state.transaction, push)
        btnRemove = document.querySelectorAll('.remove')
        btnRemove.forEach(el => {
            el.onclick = function (event) {
                console.log('you delete element')
                state.transaction[(Number(event.target.dataset.key))].remove(Number(event.target.dataset.key))

            }
        })
    }


}
var income = document.querySelector("#income")
var expense = document.querySelector("#expense")

var rate = document.querySelector("#rate")
var localRate = document.querySelector(".localRate") 

var btnAdd = document.querySelector("#add")


var desc = document.querySelector('#desc')
var amount = document.querySelector('#amount')
var type = document.querySelector('#type')

var incPart = document.querySelector("#incPart")
var expPart = document.querySelector('#expPart')

var globalBalance = document.querySelector('#globalBalance')

btnAdd.addEventListener('click', function () {

    var data = {
        type: type.value,
        description: desc.value,
        amount: Number(amount.value),
        
    }

    if (data.description != '' && data.amount != '') {
        var item = new transaction(data)
        

        item.add()
        
    } else {
        alert("Please provide transaction information...")
    }

})

var updateRate = function (e, i) {
    var rate = (e / i) * 100
    expenseRate = rate.toFixed(1)
}

var check_push_item = function (itemList, pushFn) {
    totalIncome = 0
    totalExpense = 0
    var template
    incPart.innerHTML = ''
    expPart.innerHTML = ''
//ADD CASE WHERE THERE IS NOTHING IN THE LIST AND INIT INCOME AND GLOBAL BALANCE
    itemList.forEach(function (item, key) {


        if (item.transacType === 'inc') {




            template = `<div class="budget__sticker u-budget-sticker u-budget-sticker-income">
                <span class="budget__sticker__title u-title">${item.description}</span>
                <span class="budget__sticker__del"> <i id=inc_${key} data-key=${key} class="material-icons remove">highlight_off</i></span>
                <span class="budget__sticker__inc u-inc u-display-none">+2%</span>
                <span class="budget__sticker__amount u-margin-right-adjust">+ ${item.amount}</span>  
        </div>`

            pushFn(template, incPart)
            incrementIncome(item.amount)
            balance = totalIncome - totalExpense
            updateRate(totalExpense, totalIncome)
            rate.textContent = expenseRate + '%'
            globalBalance.textContent = balance.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR"
            })
            income.textContent = totalIncome.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR"
            })

        } else if (item.transacType === 'exp') {
            try {
                var total = state.transaction.filter(el => el.transacType === 'inc').map(el => el.amount).reduce((acc, el) => acc + el)
            } catch (error) {
                alert(`Vous ne pouvez pas faire ca tchai`)
            }
            console.log(totalIncome)
            //expList.push({description:item.description,amount:Number(item.amount)})
            template = `<div class="budget__sticker u-budget-sticker u-budget-sticker-expenses">
                <span class="budget__sticker__title u-title">${item.description}</span>
                <span  class="budget__sticker__del"> <i id=exp_${key} data-key=${key} class="material-icons remove">highlight_off</i></span>
                <span class="budget__sticker__inc u-inc">${total!=0?((item.amount / total) * 100).toFixed(1):0}%</span>
               <span class="budget__sticker__amount">- ${item.amount}</span>
              </div>`

            pushFn(template, expPart)
            incrementExpense(item.amount)
            balance = totalIncome - totalExpense
            updateRate(totalExpense, totalIncome)
            rate.textContent = expenseRate + '%'
            globalBalance.textContent = balance.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR"
            })
            expense.textContent = totalExpense.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR"
            })

        }



    })

    init()
}

var push = function (template, htmlPart) {
    console.log("adding to dom...")
    htmlPart.innerHTML += template
}
var incrementIncome = function (val) {
    totalIncome += val
}

var incrementExpense = function (val) {
    totalExpense += val
}
var init = function () {
    desc.value = ''
    amount.value = ''
}

