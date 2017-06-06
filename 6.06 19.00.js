var income;
var taxPaid;
var thresh1 = 16001;
var thresh2 = 52501;
var thresh3 = 113001;
var thresh4 = 184501;
var graphIncome;
var graphTaxPaid;
var myY = [];
var myX = [];
var width = 0;
var i = 0;

for (i = 0; i < 250001; i = i + 20) {
    myX.push(width);
    width = width + 20;
    graphIncome = i;
    if (graphIncome < thresh2) {
        if (graphIncome < thresh1) {
            graphTaxPaid = 0;
        } else {
            graphTaxPaid = (graphIncome - (thresh1 - 1)) / 100 * 10;
        }
    } else if (graphIncome < thresh3) {
        graphTaxPaid = 3650 + (graphIncome - (thresh2 - 1)) / 100 * 16;
    } else if (graphIncome < thresh4) {
        graphTaxPaid = 13330 + (graphIncome - (thresh3 - 1)) / 100 * 24;
    } else {
        graphTaxPaid = 30490 + (graphIncome - (thresh4 - 1)) / 100 * 36;
    }
    graphTaxPaid = graphTaxPaid.toFixed(2);
    myY.push(graphTaxPaid);
}

function drawGraph() {
    var xY = {
        x: myX,
        y: myY,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Taxes'
    };
    var data = [xY];
    layout = {
        title: "Tax Calculation Trend",
        yaxis: {
            title: "Tax",
            zerolinewidth: 1.5
        },
        xaxis: {
            title: "Income",
            zerolinewidth: 1.5
        },
        width: 500
    };


    Plotly.newPlot("graph", data, layout);
}
drawGraph();

function buttonPress() {
    income = document.getElementById("input").value
    income = Number(income);
    if (income < thresh2) {
        if (income < thresh1) {
            taxPaid = 0;
        } else {
            taxPaid = (income - (thresh1 - 1)) / 100 * 10;
        }
    } else if (income < thresh3) {
        taxPaid = 3650 + (income - (thresh2 - 1)) / 100 * 16;
    } else if (income < thresh4) {
        taxPaid = 13330 + (income - (thresh3 - 1)) / 100 * 24;
    } else {
        taxPaid = 30490 + (income - (thresh4 - 1)) / 100 * 36;
    }
    taxPaid = taxPaid.toFixed(2);
    document.getElementById("tax").innerHTML = "$" + taxPaid;
}
