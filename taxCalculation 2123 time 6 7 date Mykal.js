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
        y: taxYValue, /*y coordinate for the 'income to tax' plot*/
        text: graphTextTax,/*text show on hover for the 'income to tax' plot*/
        type: 'scatter',/*states the style of the plot*/
        mode: 'lines', /*states that only the lines are show on the graph and not the points*/
        name: 'Income to Tax', /*gives the plot a title which is seen in the key*/
        line: {
            color: 'rgba(8, 255, 10, 0.9)', /*colour of the actual line used on the graph for the 'income to tax' plot*/
            size: 2/*detemines the line width*/
        }
    };
    var incomeAfterTaxGraph /*data and basic formating of the 'income post tax' plot*/ = {
        x: myX,/*x coordinate for the 'income post tax' plot*/
        y: incomeAfterTaxYValue, /*y coordinate for the 'income post tax' plot*/
        text: graphTextPostTaxIncome, /*text show on hover for the 'income post tax' plot*/
        type: 'scatter',/*states the style of the plot*/
        mode: 'lines', /*states that only the lines are show on the graph and not the points*/
        name: 'Income Post Tax',/*gives the plot a title which is seen in the key*/
        line: {
            color: 'rgba(89, 89, 89, 0.8)',/*colour of the actual line used on the graph for the 'income to tax' plot*/
            size: 2/*detemines the line width*/
        }
    }
    var data = [taxValue, incomeAfterTaxGraph]; /*combines the two plot variables into a variable for all the data*/
    layout /*variable for the formating fo the graph*/ = {
        title: "Zabututi Income to Tax Ratio Graph",/*assigns the graph title*/
        yaxis: /*layout options for the y axis*/ {
            range: [-5000, 200000], /*states the range of the side markers, the negive 5000 is so that the x axis doesn't cover the plots*/
            titlefont: /*sets the style of the yaxis label*/{
                family: 'Trebuchet MS', /*sets font*/
                size: 20, /*assigns size*/
                color: 'rgb(80, 80, 80)' /*assigns colour*/
            },
            exponentformat: 'none', /*indicates that the yaxis tags should not be abbreviated i.e. 50,000 instead of 50k*/
            zeroline: false,/*indicates that there is no thicker line at the 0 coordinate*/
            title: "Tax",/*assigns the title as 'tax'*/
            linecolor: 'rgb(0, 0, 0)',/*indicates that the y axis line should be coloured black*/
            linewidth: 2,/*assigns the y axis line a width*/
            tickcolor: 'rgb(0, 0, 0)',/*assigns the y axis tag protrusions a colour*/
            ticklen: 5,/*assigns the y axis tag protrusions a length*/
            tickwidth: 2,/*assigns the y axis tag protrusions width*/
            tickfont: /*text formatting for the y axis tags*/{
                family: 'Trebuchet MS',/*sets font*/
                size: 15,/*assigns size*/
                color: 'rgb(0, 100, 255)'/*sets colour*/
            },
            gridcolor: 'rgb(228, 228, 228)',/*sets background horizontal grid line colour*/
            gridwidth: '2',/*sets background horizontal grid line width*/
            anchor: 'free'/*slighly adjusts the alignment with the x axis*/
        },
        xaxis: {
            range: [0, 250000],/*states the range of the bottom markers*/
            titlefont: /*sets the style of the yaxis label*/{
                family: 'Trebuchet MS', /*sets font*/
                size: 20, /*assigns size*/
                color: 'rgb(80, 80, 80)' /*assigns colour*/
            },
            exponentformat: 'none',/*indicates that the xaxis tags should not be abbreviated i.e. 50,000 instead of 50k*/
            zeroline: false,/*indicates that there is no thicker line at the 0 coordinate*/
            tickangle: 330,/*rotates the x axis tags 330 degrees clockwise*/
            title: "Income",/*assigns the title as 'income'*/
            linecolor: 'rgb(0, 0, 0)',/*indicates that the x axis line should be coloured black*/
            linewidth: 2,/*assigns the x axis line a width*/
            tickcolor: 'rgb(0, 0, 0)',/*assigns the x axis tag protrusions a colour*/
            ticklen: 5,/*assigns the x axis tag protrusions a length*/
            tickwidth: 2,/*assigns the x axis tag protrusions width*/
            tickfont: /*text formatting for the x axis tags*/{
                family: 'Trebuchet MS',/*sets font*/
                size: 15,/*assigns size*/
                color: 'rgb(0, 100, 255)'/*sets colour*/
            },
            gridcolor: 'rgb(228, 228, 228)',/*sets background vertical grid line colour*/
            gridwidth: '2',/*sets background vertical grid line width*/
        },
        margin: /*sets the margins for the actual graph i.e. the grid/line part*/{
            l: 100,/*left margin*/
            r: 150,/*right margin*/
            t: 100,/*top margin*/
            b: 80,/*bottom margin*/
        },
        width: 650,/*sets width measurment of the graph object (all elements)*/
        height: 500/*sets height measurment of the graph object (all elements)*/
    };


    Plotly.newPlot("graph", data, layout);/*brings together the data and layout elements and draws them into the 'graph' div*/
}
drawGraph();/*runs the above function which creates the graph*/

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
