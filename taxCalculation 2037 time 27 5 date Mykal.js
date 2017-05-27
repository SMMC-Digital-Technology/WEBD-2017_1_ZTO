var income;
var taxPaid;
var thresh1 = 16001;
var thresh2 = 52501;
var thresh3 = 113001;
var thresh4 = 184501;

function buttonPress(){
    income = document.getElementById("input").value
    income = Number(income);
    if (income < thresh2) {
        if (income < thresh1){
            taxPaid = 0
        }
        else{
            taxPaid = (income - (thresh1 - 1)) / 100 * 10
        }
    }
    else if (income < thresh3){
        taxPaid = 3650 + (income - (thresh2 - 1)) / 100 * 16
    }
    else if (income < thresh4){
        taxPaid = 13330 + (income - (thresh3 - 1)) / 100 * 24
    }
    else{
        taxPaid = 30490 + (income - (thresh4 - 1)) / 100 * 36
    }
    taxPaid = taxPaid.toFixed(2);
    document.getElementById("tax").innerHTML = "$" + taxPaid;
}