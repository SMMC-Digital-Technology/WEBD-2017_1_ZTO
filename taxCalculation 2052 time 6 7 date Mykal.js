var income; /*variable for the inputed income*/
var taxPaid; /*variable for income output*/
var thresh1 = 16001; /*this variable and the following 3 determine the cutoff ranges for each tax equation*/
var thresh2 = 52501;
var thresh3 = 113001;
var thresh4 = 184501;
var graphIncome; /*a seperate variable used in calculating the Y variable of the graph*/
var graphTaxPaid;/*used as a variable to push the*/
var taxYValue = [];/*variable use as tax Y coordinates*/
var myX = [];/*universal graph x coordinates*/
var incomeAfterTaxYValue = [];/*the income after tax deductions as a number*/
var incomeAfterTax = [];/*relevant text added to the pure numerical value above*/
var graphTextTax = [];/*variable for the text shown on the income to tax plot when hovering over the graph*/
var graphTextPostTaxIncome = [];/*variable for the text show on the income post tax plot*/
var width = 0;/*variable used in a loop to add to the x coordinate*/
var i = 0;/*variable use as a counter in the loops*/
var taxYValueForText = [];/*variable for the tax value without the cents decimal places*/
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
    taxYValue.push(graphTaxPaid);
}
/*the following loop creates an array that is the tax value without the decimal places*/
for (i = 0; i < myX.length; i += 1) {
    taxYValueForText.push(taxYValue[i].slice(0, taxYValue[i].length - 3))
}
/*the following loop creates an array that is income minus tax, which is income after tax deduction*/
for (i = 0; i < myX.length; i += 1) {
    incomeAfterTaxYValue.push(myX[i] - taxYValue[i]);
}
/*the following loop creates an array that is the post taxation income plus some text which explains it, this is used later for the text on hover values*/
for (i = 0; i < incomeAfterTaxYValue.length; i += 1) {
    incomeAfterTax[i] = " income after<br>tax is $" + incomeAfterTaxYValue[i];
}
/*the following loop creates an array for the text shown on the 'income to tax' plot*/
for (i = 0; i < myX.length; i += 1) {
    graphTextTax[i] = "<br>If income is $" + myX[i] + ",<br>then tax is $" + taxYValueForText[i];
}
/*the following loop adds some more text to the post tax income, this is the final text show on hover for the 'income post tax' plot*/
for (i = 0; i < myX.length; i += 1) {
    graphTextPostTaxIncome[i] = "<br>If income is $" + myX[i] + ",<br>then" + incomeAfterTax[i];
}
/*the following function determines how the graph is drawn*/
function drawGraph() {
    var taxValue /*data and basic formating of the 'income to tax' plot*/= {
        x: myX, /*x coordinate for the 'income to tax' plot*/ 
        y: taxYValue, /*x coordinate for the 'income to tax' plot coordinate for the 'income to tax' plot*/
        text: graphTextTax,/*text show on hover for the 'income to tax' plot*/
        type: 'scatter',/*states the style of the plot*/
        mode: 'lines', /*states that only the lines are show on the graph and not the points*/
        name: 'Income to Tax', /*gives the plot a title which is seen in the key*/
        line: {
            color: 'rgba(8, 255, 10, 0.9)', /*colour of the actual line used on the graph for the 'income to tax' plot*/
            size: 2/*detemines the line width*/
        }
    };
    var incomeAfterTaxGraph = {
        x: myX,
        y: incomeAfterTaxYValue,
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
        x: .5,
        yaxis: {
            domain: [0, 1],
            range: [-5000, 200000],
            titlefont: {
                family: 'Trebuchet MS',
                size: 20,
                color: 'rgb(80, 80, 80)'
            },
            exponentformat: 'none',
            zeroline: false,
            title: "Tax",
            showticklabels: true,
            linecolor: 'rgb(0, 0, 0)',
            linewidth: 2,
            lines: "outside",
            autotick: true,
            zeroline: false,
            ticks: 'outside',
            tickcolor: 'rgb(0, 0, 0)',
            ticklen: 5,
            tickwidth: 2,
            tickfont: {
                family: 'Trebuchet MS',
                size: 15,
                color: 'rgb(0, 100, 255)'
            },
            gridcolor: 'rgb(248, 248, 248)',
            gridwidth: '2',
            anchor: 'free'
        },
        margin: {
            autoexpand: false,
            l: 100,
            r: 200,
            t: 100,
            b: 80,
            pad: 0,
            autoexpand: false
        },
        xaxis: {
            domain: [0, 1],
            range: [0, 250000],
            titlefont: {
                family: 'Trebuchet MS',
                size: 20,
                color: 'rgb(80, 80, 80)'
            },
            exponentformat: 'none',
            zeroline: false,
            tickangle: 330,
            title: "Income",
            showticklabels: true,
            linecolor: 'rgb(0,0,0)',
            linewidth: 2,
            autotick: true,
            ticks: 'outside',
            tickcolor: 'rgb(0,0,0)',
            ticklen: 5,
            tickwidth: 2,
            tickfont: {
                family: 'Trebuchet MS',
                size: 15,
                color: 'rgb(0, 100, 255)',
            },
            gridcolor: 'rgb(248, 248, 248)',
            gridwidth: '2',
            anchor: 'free',
        },
        width: 650,
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
