//import { stat } from "fs";

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
        // verify integrity
        //console.log(this)
        state.transaction.unshift(this)
        check_push_item(state.transaction, push)
        console.log(state.transaction)



    },

    remove: function(key) {
        //let key=state.transaction.indexOf(this)
       // console.log(state.transaction)
        state.transaction.splice(key,1)
        //console.log(state.transaction)
        check_push_item(state.transaction, push)


    }


}
var income = document.querySelector("#income")
var expense = document.querySelector("#expense")

var rate = document.querySelector("#rate")
var localRate = document.querySelector(".localRate") //return NodeList

var btnAdd = document.querySelector("#add")
var btnRemove=[]

var desc = document.querySelector('#desc')
var amount = document.querySelector('#amount')
var type = document.querySelector('#type')

var incPart = document.querySelector("#incPart")
var expPart = document.querySelector('#expPart')

var globalBalance = document.querySelector('#globalBalance')




/*Add fucntionality

2-check for type(exp or inc)
3-push to the corresponding part(expense or income)

*/

btnAdd.addEventListener('click', function () {

    var data = {
        type: type.value,
        description: desc.value,
        amount: Number(amount.value),
        //expRate:
    }

    if (data.description != '' && data.amount != '') {
        var item = new transaction(data)
        //console.log(item)

        item.add()
       // bindDel()
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

    itemList.forEach(function (item,key) {




        if (item.transacType === 'inc') {




            template = `<div class="budget__sticker u-budget-sticker u-budget-sticker-income">
                <span class="budget__sticker__title u-title">${item.description}</span>
                <span class="budget__sticker__del"> <i data-key=${key} class="material-icons remove">highlight_off</i></span>
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
            
            var total = state.transaction.filter(el => el.transacType === 'inc').map(el => el.amount).reduce((acc, el) => acc + el)
         
            console.log(totalIncome)
            //expList.push({description:item.description,amount:Number(item.amount)})
            template = `<div class="budget__sticker u-budget-sticker u-budget-sticker-expenses">
                <span class="budget__sticker__title u-title">${item.description}</span>
                <span  class="budget__sticker__del"> <i data-key=${key}  class="material-icons remove">highlight_off</i></span>
                <span class="budget__sticker__inc u-inc">${((item.amount / total) * 100).toFixed(1)}%</span>
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
    btnRemove.push(document.querySelector(".remove"))
    bindDel()


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

//bindDel()

   var bindDel=function(){
    btnRemove.forEach(el=>{
        el.onclick=function(){
            console.log('you delete element')

            state.transaction[(Number(el.dataset.key))].remove(Number(el.dataset.key))

        }
    })
   }
