var income; /*variable for the inputed income*/
var taxPaid; /*variable for income output*/
var thresh1 = 16001; /*this variable and the following 3 determine the cutoff ranges for each tax equation*/
var thresh2 = 52501;
var thresh3 = 113001;
var thresh4 = 184501;
var graphIncome; /*a seperate variable used in calculating the Y variable of the graph*/
var graphTaxPaid;
var myY = [];
var myX = [];
var incomeAfterTaxValue = [];
var incomeAfterTax = [];
var graphTextTax = [];
var graphTextPostTaxIncome = [];
var width = 0;
var i = 0;
var myYForText = [];
for (i = 0; i < 250001; i += 100) {
    myX.push(width);
    width += 100;
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
for (i = 0; i < myX.length; i += 1) {
    myYForText.push(myY[i].slice(0, myY[i].length - 3))
}
for (i = 0; i < myX.length; i += 1) {
    incomeAfterTaxValue.push(myX[i] - myY[i]);
}
for (i = 0; i < incomeAfterTaxValue.length; i += 1) {
    incomeAfterTax[i] = " income after<br>tax is $" + incomeAfterTaxValue[i];
}
for (i = 0; i < myX.length; i += 1) {
    graphTextTax[i] = "<br>If income is $" + myX[i] + ",<br>then tax is $" + myYForText[i];
}
for (i = 0; i < myX.length; i += 1) {
    graphTextPostTaxIncome[i] = "<br>If income is $" + myX[i] + ",<br>then" + incomeAfterTax[i];
}

function drawGraph() {
    var taxValue = {
        x: myX,
        y: myY,
        text: graphTextTax,
        type: 'scatter',
        mode: 'lines',
        name: 'Income to Tax',
        line: {
            color: 'rgba(8, 255, 10, 0.9)',
            size: 2
        }
    };
    var incomeAfterTaxGraph = {
        x: myX,
        y: incomeAfterTaxValue,
        text: graphTextPostTaxIncome,
        type: 'scatter',
        mode: 'lines',
        name: 'Income Post Tax',
        line: {
            color: 'rgba(89, 89, 89, 0.8)',
            size: 2
        }
    }
    var data = [taxValue, incomeAfterTaxGraph];
    layout = {
        title: "Zabututi Income to Tax Ratio Graph",
        yaxis: {
            title: "Tax",
            zerolinewidth: 1,
            showticklabels: true,
            linecolor: 'rgb(0, 0, 0)',
            linewidth: 2,
            autotick: true,
            ticks: 'outside',
            tickcolor: 'rgb(0, 0, 0)',
            ticklen: 9,
            tickwidth: 2,
            tickfont: {
                family: 'Trebuchet MS',
                size: 20,
                color: 'rgb(0, 100, 255)'
            }
        },
        xaxis: {
            title: "Income",
            zerolinewidth: 2,
            showticklabels: true,
            linecolor: 'rgb(0, 0, 0)',
            linewidth: 2,
            autotick: true,
            tick: 'inside',
            tickcolor: 'rgb(0, 0, 0)',
            ticklen: 9,
            tickwidth: 2,
            tickfont: {
                family: 'Trebuchet MS',
                size: 20,
                color: 'rgb(0, 100, 255)'
            }
        },
        width: 600,
        height: 500
    };


    Plotly.newPlot("graph", data, layout);
}
drawGraph();

function buttonPress() {
    income = document.getElementById("input").value;
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
