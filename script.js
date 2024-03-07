

let globalPlanCostbyod = 0;
let globalAddonCostbyod = 0;
let globalfirstbill = 0;

//-------------------these are te global variable for new phone field-----------------

let globalPlanCostNewPhone = 0;
let globalAddonCostNewPhone = 0;
let globalOneTimeChargeNewPhone = 0;
let globalOneTimeChargeWaivedNewPhone = false;
let globalDownPaymentNewPhone = 0;
let globalPhoneRetailCostNewPhone = 0;
let globalFinancingDiscountNewPhone = 0;
let globalleasebuyout = 0;

//------------------------------------------------------------------------------------

// Function to toggle fields based on the selected option
function toggleFields(selectedType) {
var byodFields = document.getElementById('byodFields');
var newPhoneFields = document.getElementById('newPhoneFields');

// Hide both sections and only show the selected one
byodFields.style.display = 'none';
newPhoneFields.style.display = 'none';

if (selectedType === 'BYOD') {
    byodFields.style.display = 'block';
} else if (selectedType === 'New Phone') {
    newPhoneFields.style.display = 'block';
}
}

// Check if the BYOD fields are filled
function areByodFieldsFilled() {
return document.getElementById('monthlyPlanCostNoTerm').value &&
       document.getElementById('monthlyAddonCostBYOD').value &&
       document.getElementById('oneTimeCharges').value;
}

function arenewPhoneFields() {
  return document.getElementById('monthlyPlanCostContract').value &&
         document.getElementById('phoneRetailCost').value &&
         document.getElementById('monthlyAddonCost').value &&
         document.getElementById('downPayment').value &&
         document.getElementById('financingDiscount').value &&
         document.getElementById('oneTimeChargescontract').value; // Assuming this ID for one-time charges
}

// Modified displayNextForm function to include country and province dropdowns
function displayNextForm() {

  globalPlanCostbyod = parseFloat(document.getElementById('monthlyPlanCostNoTerm').value) || 0;
  globalAddonCostbyod = parseFloat(document.getElementById('monthlyAddonCostBYOD').value) || 0;
  globalfirstbill = parseFloat(document.getElementById('oneTimeCharges').value) || 0;


   document.querySelector('.phone-screen').innerHTML =
   '<form id="countryForm">' +
   '<div class="form-group">' +
   '<label>Select country:</label>' +
   '<select id="country" name="country">' +
   '<option value="CANADA">CANADA</option>' +
   '</select>' +
   '</div>' +
   '<div class="form-group">' +
   '<label>Select province:</label>' +
   '<select id="province" name="province">' +
   '<option value="ALBERTA">Alberta</option>' +
   '<option value="BRITISH_COLUMBIA">British Columbia</option>' +
   '<option value="MANITOBA">Manitoba</option>' +
   '<option value="NEW_BRUNSWICK">New Brunswick</option>' +
   '<option value="NEWFOUNDLAND_AND_LABRADOR">Newfoundland and Labrador</option>' +
   '<option value="NORTHWEST_TERRITORIES">Northwest Territories</option>' +
   '<option value="NOVA_SCOTIA">Nova Scotia</option>' +
   '<option value="NUNAVUT">Nunavut</option>' +
   '<option value="ONTARIO">Ontario</option>' +
   '<option value="PRINCE_EDWARD_ISLAND">Prince Edward Island</option>' +
   '<option value="QUEBEC">Quebec</option>' +
   '<option value="SASKATCHEWAN">Saskatchewan</option>' +
   '<option value="YUKON">Yukon</option>' +
   '</select>' +
   '</div>' +
   '<div class="form-group submit-group">' +
   '<button type="button" id="finalSubmit" class="btn">Calculate Bill</button>' +
   '</div>' +
   '</form>';

   // Add event listener for the final submit button within the new form
   document.getElementById('finalSubmit').addEventListener('click', calculateFinalBill);
}
//-----------------NOW DUPLICATING FOR NEW PHONE SECTION---------------------------------------------

function displaynewPhonenext() {

  globalPlanCostNewPhone = parseFloat(document.getElementById('monthlyPlanCostContract').value) || 0;
  globalAddonCostNewPhone = parseFloat(document.getElementById('monthlyAddonCost').value) || 0;
  globalPhoneRetailCostNewPhone = parseFloat(document.getElementById('phoneRetailCost').value) || 0;
  globalDownPaymentNewPhone = parseFloat(document.getElementById('downPayment').value) || 0;
  globalFinancingDiscountNewPhone = parseFloat(document.getElementById('financingDiscount').value) || 0;
  globalOneTimeChargeNewPhone = parseFloat(document.getElementById('oneTimeChargescontract').value) || 0;
  globalleasebuyout = parseFloat(document.getElementById('leaseBuyOutAmount').value) || 0;

   document.querySelector('.phone-screen').innerHTML =
   '<form id="countryForm">' +
   '<div class="form-group">' +
   '<label>Select country:</label>' +
   '<select id="country" name="country">' +
   '<option value="CANADA">CANADA</option>' +
   '</select>' +
   '</div>' +
   '<div class="form-group">' +
   '<label>Select province:</label>' +
   '<select id="province" name="province">' +
   '<option value="ALBERTA">Alberta</option>' +
   '<option value="BRITISH_COLUMBIA">British Columbia</option>' +
   '<option value="MANITOBA">Manitoba</option>' +
   '<option value="NEW_BRUNSWICK">New Brunswick</option>' +
   '<option value="NEWFOUNDLAND_AND_LABRADOR">Newfoundland and Labrador</option>' +
   '<option value="NORTHWEST_TERRITORIES">Northwest Territories</option>' +
   '<option value="NOVA_SCOTIA">Nova Scotia</option>' +
   '<option value="NUNAVUT">Nunavut</option>' +
   '<option value="ONTARIO">Ontario</option>' +
   '<option value="PRINCE_EDWARD_ISLAND">Prince Edward Island</option>' +
   '<option value="QUEBEC">Quebec</option>' +
   '<option value="SASKATCHEWAN">Saskatchewan</option>' +
   '<option value="YUKON">Yukon</option>' +
   '</select>' +
   '</div>' +
   '<div class="form-group submit-group">' +
   '<button type="button" id="finalSubmitcontract" class="btn">Calculate Bill</button>' +
   '</div>' +
   '</form>';

   // Add event listener for the final submit button within the new form
   document.getElementById('finalSubmitcontract').addEventListener('click', calculateFinalBillContract);

}

//---------------------------------------------------------------------------------------------------

function calculateFinalBill() {
   var province = document.getElementById('province').value;
   var taxRate;
   switch (province) {
       case "ALBERTA":
       case "BRITISH_COLUMBIA":
       case "MANITOBA":
       case "NORTHWEST_TERRITORIES":
       case "NUNAVUT":
       case "QUEBEC":
       case "SASKATCHEWAN":
       case "YUKON":
           taxRate = 0.05;
           break;
       case "ONTARIO":
           taxRate = 0.13;
           break;
       case "NEW_BRUNSWICK":
       case "NEWFOUNDLAND_AND_LABRADOR":
       case "NOVA_SCOTIA":
       case "PRINCE_EDWARD_ISLAND":
           taxRate = 0.15;
           break;
       default:
           taxRate = 0; // Default case if the province is not on the list.
   }

   var totalBill = (globalPlanCostbyod + globalAddonCostbyod) * (1 + taxRate);
   var firstbill = (globalPlanCostbyod + globalAddonCostbyod + globalfirstbill) * (1 + taxRate);

   // Clear the form and display the total bill as text
   var form = document.querySelector('.phone-screen form');
   form.innerHTML = ''; // Clear out all form content

   // Create a new div to hold the total bill text
   var billDiv = document.createElement('div');
   billDiv.style.textAlign = 'center';
   billDiv.style.margin = '20px 0'; // Add some spacing around the text
   billDiv.style.fontSize = '1.2em'; // Make the text a little larger
   billDiv.style.wordWrap = 'break-word'; // Ensure the text wraps to avoid overflow
   billDiv.innerHTML = "<strong>Bill Summary Including Tax</strong><br>" + "<br>" +
                       "Total monthly bill after tax: $" + totalBill.toFixed(2) + "<br>" + "<br>" +
                       "1st Bill is $" + firstbill.toFixed(2) + "<br>" +
                       "2st Bill is $" + totalBill.toFixed(2) + "<br>" +
                       "3rd Bill is $" + totalBill.toFixed(2) + "<br>" +
                       "4th Bill is $" + totalBill.toFixed(2) + "<br>" +
                       "5th Bill is $" + totalBill.toFixed(2) + "<br>" +
                       "6th Bill is $" + totalBill.toFixed(2);


   // Append the new div to the form container
   form.appendChild(billDiv);

   var homeButton = document.createElement('button');
       homeButton.innerText = 'Back to Home';
       homeButton.className = 'btn'; // Assuming 'btn' class is for styling
       homeButton.onclick = function() {
           location.reload(); // This will reload the page
       };

       // Append the "Home" button below the total bill text
       form.appendChild(homeButton);
   }

// Modify the event listener for byodSubmit to use displayNextForm directly without calculating the bill immediately
document.getElementById('byodSubmit').addEventListener('click', function() {
   if (areByodFieldsFilled()) {
       displayNextForm();
   } else {
       alert('Please fill in all fields for the BYOD plan.');
   }
});
// Modify the event listener for newphonesubmit to use displayNextForm directly without calculating the bill immediately
document.getElementById('phoneSubmit').addEventListener('click', function() {
   if (arenewPhoneFields()) {
       displaynewPhonenext();
   } else {
       alert('Please fill in all fields to calculate cost with New Phone.');
   }
});

// Make sure to add event listener for 'finalSubmit' button after new form is added to DOM
document.addEventListener('click', function(event) {
   if (event.target && event.target.id === 'finalSubmit') {
       calculateFinalBill();
   }
});

//------------------------------DUPLICATING FOR NEW PHONE---------------------------------------------------------------

function calculateFinalBillContract() {

     var province = document.getElementById('province').value;
     var taxRate;
     switch (province) {
         case "ALBERTA":
         case "BRITISH_COLUMBIA":
         case "MANITOBA":
         case "NORTHWEST_TERRITORIES":
         case "NUNAVUT":
         case "QUEBEC":
         case "SASKATCHEWAN":
         case "YUKON":
             taxRate = 0.05;
             break;
         case "ONTARIO":
             taxRate = 0.13;
             break;
         case "NEW_BRUNSWICK":
         case "NEWFOUNDLAND_AND_LABRADOR":
         case "NOVA_SCOTIA":
         case "PRINCE_EDWARD_ISLAND":
             taxRate = 0.15;
             break;
         default:
             taxRate = 0; // Default case if the province is not on the list.
     }



      var phoneTotalCost = globalPhoneRetailCostNewPhone - globalDownPaymentNewPhone - globalFinancingDiscountNewPhone;
      var phonemonthlycost = (phoneTotalCost + (phoneTotalCost * taxRate)) / 24;
      var planmonthlycost = (globalPlanCostNewPhone + globalAddonCostNewPhone) * (1 + taxRate);
      var monthlycostcontractperiod = phonemonthlycost + planmonthlycost;
      var showleaseBuyOutAmount = globalleasebuyout
      var monthlycostcontractperiodatlease = ((phoneTotalCost * (1 + taxRate)) - showleaseBuyOutAmount) / 24;
      var monthlytotalbillonlease = planmonthlycost + monthlycostcontractperiodatlease

     // Clear the form and display the total bill as text
     var form = document.querySelector('.phone-screen form');
     form.innerHTML = ''; // Clear out all form content

     // Create a new div to hold the total bill text
     var billDivcontract = document.createElement('div');
     billDivcontract.style.textAlign = 'center';
     billDivcontract.style.margin = '20px 0'; // Add some spacing around the text
     billDivcontract.style.fontSize = '1.2em'; // Make the text a little larger
     billDivcontract.style.wordWrap = 'break-word'; // Ensure the text wraps to avoid overflow
     billDivcontract.innerHTML = "<strong>Bill Summary Including Tax</strong><br>" + "<br>" +
                         "Total monthly on Finance: $" + monthlycostcontractperiod.toFixed(2) + "<br>" + "<br>" +
                         "Total monthly on Lease: $" + monthlytotalbillonlease.toFixed(2) + "<br>" + "<br>" +
                          "Monthly Plan cost is $" + planmonthlycost.toFixed(2) + "<br>" +
                          "Monthly Financing cost is $" + phonemonthlycost.toFixed(2) + "<br>" +
                          "Monthly Leasing is $" + monthlycostcontractperiodatlease.toFixed(2) + "<br>";


     // Append the new div to the form container
     form.appendChild(billDivcontract);

     var homeButton = document.createElement('button');
         homeButton.innerText = 'Back to Home';
         homeButton.className = 'btn'; // Assuming 'btn' class is for styling
         homeButton.onclick = function() {
             location.reload(); // This will reload the page
         };

         // Append the "Home" button below the total bill text
         form.appendChild(homeButton);

}



//---------------------------------------------------------------------------------------------
function toggleLeaseBuyOutField() {
    var selection = document.getElementById('leaseorfinanceid').value;
    var leaseBuyOutField = document.getElementById('leaseBuyOutField');
    if (selection === 'Lease') {
        leaseBuyOutField.style.display = 'block';
    } else {
        leaseBuyOutField.style.display = 'none';
    }
}
// Rest of the code remains unchanged...

    document.getElementById('newPhone').addEventListener('click', function() {
        toggleFields('New Phone');
    });

    // Make sure to add event listener for 'finalSubmit' button after new form is added to DOM
    document.addEventListener('click', function(event) {
       if (event.target && event.target.id === 'finalSubmitcontract') {
           calculateFinalBillContract();
       }
    });


    // Add validation event listeners for required fields
