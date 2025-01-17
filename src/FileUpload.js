import React, { Component } from 'react';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      jsonData: null,  // New state to store the parsed JSON data
    };
  }
  
  handleFileSubmit = (event) => {
    event.preventDefault();
    const { file } = this.state;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const json = this.csvToJson(text);
        this.setState({ jsonData: json });  // Set JSON to state
        this.props.set_data(json)
      };
      reader.readAsText(file);
    }
  };

  csvToJson = (csv) => {
    const lines = csv.split("\n").filter(line => line.trim()); // Remove empty rows
    const headers = lines[0].split(",").map(header => header.trim()); // Trim headers
    const result = [];
  
    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",").map(value => value.trim()); // Trim each value
      const obj = {};
  
      headers.forEach((header, index) => {
        obj[header] = currentLine[index] || null; // Assign value or null if missing
      });
  
      const parsedObj = {
        age: parseInt(obj.age),
        annual_income: parseFloat(obj['annual_income']),
        monthly_inhand_salary: parseFloat(obj['monthly_inhand_salary']),
        credit_history_age: parseFloat(obj['credit_history_age']),
        total_emi_per_month: parseFloat(obj['total_emi_per_month']),
        num_bank_accounts: parseFloat(obj['num_bank_accounts']),
        num_credit_card: parseFloat(obj['num_credit_card']),
        interest_rate: parseFloat(obj['interest_rate']),
        num_of_loan: parseFloat(obj['num_of_loan']),
        delay_from_due_date: parseFloat(obj['delay_from_due_date']),
        num_of_delayed_payment: parseFloat(obj['num_of_delayed_payment']),
        num_credit_inquiries: parseFloat(obj['num_credit_inquiries']),
        credit_mix: obj['credit_mix'],
        outstanding_debt: parseFloat(obj['outstanding_debt']),
        credit_utilization_ratio: parseFloat(obj['credit_utilization_ratio']),
        payment_of_min_amount: obj['payment_of_min_amount'],
        amount_invested_monthly: parseFloat(obj['amount_invested_monthly']),
        monthly_balance: parseFloat(obj['monthly_balance']),
        credit_score: parseInt(obj['credit_score']) == 0 ? 'Low' : (parseInt(obj['credit_score']) == 1 ? 'Average' : 'High'),
      };
  
      result.push(parsedObj);
    }
    return result;
  };
  

  render() {
    return (
      <div style={{ backgroundColor: "#f0f0f0", padding: 20 }}>
        <h2>Upload a CSV File</h2>
        <form onSubmit={this.handleFileSubmit}>
          <input type="file" accept=".csv" onChange={(event) => this.setState({ file: event.target.files[0] })} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default FileUpload;