// console.log("Mortgage");

// Inputs / DOM Elements

const homeValue = document.getElementById("homeValue");
const downPayment = document.getElementById("downPayment");
const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanDuration = document.getElementById("loanDuration");

const form = document.getElementById("mortgage");

// console.log(homeValue, downPayment, loanAmount, interestRate, form);
homeValue.addEventListener("change", () => {
    console.log(homeValue.value)
    let value = parseFloat(homeValue.value);
    if (!value) { // Check if homeValue is falsy (null or 0)
        value = 1; // Set default value if homeValue is falsy
        homeValue.value = value; // Set the default value in the input field
    }
    downPayment.value = homeValue.value * 0.25;
    loanAmount.value = homeValue.value - downPayment.value;
    interestRate.value= 28
     var loanAmountValue = loanAmount.value;
    var loanAmountValu = downPayment.value;
    var interest = interestRate.value
    return loanAmountValue ,loanAmountValu , interest;
  });

function calculateMortgage(loanAmount, interestRate, numberMonthlyPayments) {
  interestRate = percentageToDecimal(interestRate);
  function percentageToDecimal(percent) {
    return percent / 12 / 100;
  }

  numberMonthlyPayments = yearsToMonths(numberMonthlyPayments);
  function yearsToMonths(year) {
    return year * 12;
  }

  let mortgage =
    (interestRate * loanAmount) /
    (1 - Math.pow(1 + interestRate, -numberMonthlyPayments));

 
  return parseFloat(mortgage.toFixed(2));
}

form.onchange = (e) => {
  e.preventDefault();

   $("#zero").addClass( "d-none")
   $("#zero0").addClass( "d-none")
   $("#zeroo").addClass( "d-none")

  

  let loanAmount = homeValue.value - downPayment.value;

  let monthlyPaymentt = calculateMortgage(
    loanAmount,
    interestRate.value,
    loanDuration.value
    
  );
console.log(monthlyPaymentt.monthlyPayment)
  document.getElementById("monthlyPayment").innerHTML = `$ ${monthlyPaymentt.monthlyPayment}`;
  document.getElementById("totalInterest").innerHTML = `$ ${monthlyPaymentt.totalInterest}`;
  document.getElementById("totalPayment").innerHTML = `$ ${monthlyPaymentt.totalPayment}`;
};


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
     M.FormSelect.init(elems);
  });



const ctx = document.getElementById('mortgageChart').getContext('2d');
  
  
  let chartData = {
    labels: ['Monthly Payment', 'Total Interest', 'Total Payment'],
    datasets: [{
      label: 'Mortgage Details',
      data: [3, 0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
       
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  };
  
  // Create a new chart instance
  const mortgageChart = new Chart(ctx, {
    type: 'pie',
    data: chartData,
    options: {}
  });
  
  // Function to update the chart
  function updateChart(monthlyPayment, totalInterest, totalPayment) {
    // Update the chart data
    mortgageChart.data.datasets[0].data[0] = monthlyPayment;
    mortgageChart.data.datasets[0].data[1] = totalInterest;
    mortgageChart.data.datasets[0].data[2] = totalPayment;
  
    // Update the chart
    mortgageChart.update();
  }
  
  // Function to calculate mortgage
  function calculateMortgage(loanAmount, interestRate, numberMonthlyPayments) {
    interestRate = percentageToDecimal(interestRate);
  
    function percentageToDecimal(percent) {
      return percent / 12 / 100;
    }
  
    numberMonthlyPayments = yearsToMonths(numberMonthlyPayments);
  
    function yearsToMonths(year) {
      return year * 12;
    }
  
    let monthlyInterestRate = interestRate;
    let monthlyPayment = (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberMonthlyPayments));
  
    let totalInterest = monthlyPayment * numberMonthlyPayments - loanAmount;
    let totalPayment = monthlyPayment * numberMonthlyPayments;
  
    return {
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalPayment: parseFloat(totalPayment.toFixed(2))
    };
  }
  
 
  document.getElementById('mortgage').addEventListener('change', function() {
   
    let homeValue = parseFloat(document.getElementById('homeValue').value);
    let downPayment = parseFloat(document.getElementById('downPayment').value);
    let loanAmount = homeValue - downPayment;
    let interestRate = parseFloat(document.getElementById('interestRate').value);
    let loanDuration = parseFloat(document.getElementById('loanDuration').value);
  
    let { monthlyPayment, totalInterest, totalPayment } = calculateMortgage(loanAmount, interestRate, loanDuration);
  
    updateChart(monthlyPayment, totalInterest, totalPayment);
    
    
    
  });

 