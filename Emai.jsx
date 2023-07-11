import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "./Email.css";
import emiimage from '../images/emi.gif'
import { Chart, ArcElement, Tooltip } from "chart.js";
Chart.register(ArcElement, Tooltip);

const Emai = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [loanTenureType, setLoanTenureType] = useState("months"); // Default to months
  const [interestRate, setInterestRate] = useState("");
  const [emi, setEmi] = useState("");
  const [totalInterest, setTotalInterest] = useState("");
  const [totalPayment, setTotalPayment] = useState("");
  const [showLoanAmount, setShowLoanAmount] = useState(true);
  const [showTotalPayment, setShowTotalPayment] = useState(true);

  const chartData = {
    labels: ["Loan Amount", "Total Interest Payable", "Total Payments Made"],
    datasets: [
      {
        data: [loanAmount, totalInterest, totalPayment],
        backgroundColor: ["#fa20fa", "#edd328", "#28eddd"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";

            if (label) {
              return label + ": " + context.parsed + " INR";
            }
          },
        },
      },
    },
  };

  const calculateEmi = () => {
    // ... existing calculateEmi function code
    const principal = parseFloat(loanAmount);
    const tenure = parseInt(loanTenure);
    const rate = parseFloat(interestRate);

    if (isNaN(principal) || isNaN(tenure) || isNaN(rate)) {
      alert("Please enter valid numbers for all fields.");
      return;
    }

    const tenureInMonths = loanTenureType === "months" ? tenure : tenure * 12;
    const r = rate / (12 * 100); // Monthly interest rate
    const n = tenureInMonths; // Total number of installments

    const emiValue =
      (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaymentValue = emiValue * n;
    const totalInterestValue = totalPaymentValue - principal;

    setEmi(emiValue.toFixed(2));
    setTotalPayment(totalPaymentValue.toFixed(2));
    setTotalInterest(totalInterestValue.toFixed(2));
  };

  return (
    <>
        <h1 className="text-center "><i class="fa-solid fa-calculator"></i>A Basics Emi Calculator</h1>
      <div className="container-fluid">
       
        <p className="text-center mb-4 mt-3" id="emi-p">
          EMI calculator is a basic calculator that helps you to calculate the
          EMI, <br/>monthly interest, and monthly reducing balance on the basis of<br/>
          principal amount, loan tenure, and interest rate
        </p>

        <div className="container">
          <div className="row">
            <div className="col-md-7 " id="input-field">
              <div>
                <div className="row p-4">
                  <div className="col-md-12 mt-2" id="total-amount">
                    <label>Total Loan Amount:</label>
                    <input
                      type="text"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                  </div>

                   <div className="col-md-12 mt-2">
                        <div className="total-loan">
                        <label>Total Loan Tenure:</label>
                        <input
                            type="text"
                            value={loanTenure}
                            onChange={(e) => setLoanTenure(e.target.value)}
                        />
                        <div className="d-flex gap-1">
                        <div>
                            <input
                            type="radio"
                            id="months"
                            name="loanTenureType"
                            value="months"
                            checked={loanTenureType === "months"}
                            onChange={(e) => setLoanTenureType(e.target.value)}
                            />
                            <label htmlFor="months">Months</label>
                        </div>
                        <div>
                            <input
                            type="radio"
                            id="years"
                            name="loanTenureType"
                            value="years"
                            checked={loanTenureType === "years"}
                            onChange={(e) => setLoanTenureType(e.target.value)}
                            />
                            <label htmlFor="years">Years</label>
                        </div>
                        </div>
                        </div>
                  </div>

                  <div className="col-md-12 mt-2">
                        <div className="intrenst-div">
                            <label>Interest (% per annum):</label>
                            <input
                            type="text"
                             value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}/>
                        </div>
                  </div>
                </div>

              

                <div className="col-md-8 mt-3 mb-4 text-center">
                  <button onClick={calculateEmi} className="calculate-btn">Calculate</button>
                </div>
              </div>
            </div>

            <div className="col-md-5">
                <div>
                    <img src={emiimage} alt="there is nothing" className="w-100"/>
                </div>
            </div>
          </div>

          <div className="row  border mt-5">
            <div className="col-md-6 text-center" id="gettotal">
              <div className="">
                {emi && (
                  <div className="p-5">
                    <h6>Total EMI: </h6>
                    <h3> <span className="rupi-sign">&#x20B9;</span>{emi}</h3>
                    <hr />
                    <h6>Total Interest Payable:</h6> <h3><span className="rupi-sign">&#x20B9;</span>{totalInterest}</h3>
                    <hr />
                    <h6>Total Payments Made: </h6>
                    <h3><span className="rupi-sign">&#x20B9;</span>{totalPayment}</h3>
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6">
                <h4 className="text-center">Break-up of Total Payment</h4>
              <div className="d-flex justify-content-center pt-3 mt-3">
                <div style={{ marginTop: "1rem", width: "60%", height: "60%" }}>
                  <Pie data={chartData} options={chartOptions} />
                </div>
                <div className="checkbox-container">
                  <div>
                    <input
                      type="checkbox"
                      checked={showLoanAmount}
                      onChange={() => setShowLoanAmount(!showLoanAmount)} className="loan-amount"
                    />
                    <label className="show-loan">Show Loan Amount</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={showTotalPayment}
                      onChange={() => setShowTotalPayment(!showTotalPayment)}
                    />
                    <label className="total-payment">Total Payment Mode</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      checked={showTotalPayment}
                      onChange={() => setShowTotalPayment(!showTotalPayment)}
                    />
                    <label className="total-Interest">Total Interest</label>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Emai;

