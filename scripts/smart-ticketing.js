document.getElementById('buy-tickets').addEventListener('click', function() {
    document.getElementById('ticket-PH-paribahan').scrollIntoView({ 
      behavior: 'smooth' 
    });
  });
  
  //  // Function to handle seat selection
  //  function handleSeatSelection(button) {
  //   const selectedSeats = document.querySelectorAll('.selected');

  //   // Toggle selected state
  //   if (!button.classList.contains('selected')) {
  //     if (selectedSeats.length < 4) {
  //       button.classList.add('selected', 'bg-green-500', 'text-white');
  //     } else {
  //       alert('You can only select up to 4 seats.');
  //     }
  //   } else {
  //     button.classList.remove('selected', 'bg-green-500', 'text-white');
  //   }

  //   // Disable all seat buttons if 4 seats are selected
  //   if (selectedSeats.length === 4) {
  //     document.querySelectorAll('.btn').forEach(btn => {
  //       if (!btn.classList.contains('selected')) {
  //         btn.disabled = true;
  //       }
  //     });
  //     // Enable apply button
  //     document.getElementById('apply-cupon').disabled = false;
  //   } else {
  //     // Enable all seat buttons
  //     document.querySelectorAll('.btn').forEach(btn => {
  //       btn.disabled = false;
  //     });
  //     // Disable apply button
  //     document.getElementById('apply-cupon').disabled = true;
  //   }
  // }

  // // Add click event listeners to seat buttons in the left part
  // const seatButtons = document.querySelectorAll('#left .btn');
  // seatButtons.forEach(button => {
  //   button.addEventListener('click', () => {
  //     handleSeatSelection(button);
  //   });
  // });

// Get the input fields and the purchaseTicket button
const nameInput = document.getElementById('name');
const phoneNumberInput = document.getElementById('phone');
const purchaseTicketButton = document.getElementById('purchase');

// Function to validate phone number format (11 digits)
function isValidPhoneNumber(phoneNumber) {
    return /^\d{11}$/.test(phoneNumber);
}

// Function to check if the purchase ticket button should be enabled
function updatePurchaseTicketButton() {
    // Get the selected seat count
    const selectedCount = document.querySelectorAll('.selected').length;

    // Check if the name input is not empty and the phone number is valid
    const isNameValid = nameInput.value.trim() !== '';
    const isPhoneNumberValid = isValidPhoneNumber(phoneNumberInput.value);

    // Enable the purchase ticket button if conditions are met
    purchaseTicketButton.disabled = !(selectedCount > 0 && isNameValid && isPhoneNumberValid);
}

// Add event listeners to name and phone number inputs to validate and update the purchase ticket button
nameInput.addEventListener('input', updatePurchaseTicketButton);
phoneNumberInput.addEventListener('input', updatePurchaseTicketButton);




  function seatSelect(event) {
    const selectedSeats = document.querySelectorAll('.selected');
    const maxSeatsAllowed = 4;
    const applyCouponButton = document.getElementById('apply-coupon');
    const purchaseTicket = document.getElementById("purchase");

    if (!event.target.classList.contains('selected')) {
        if (selectedSeats.length < maxSeatsAllowed) {
            event.target.classList.add('selected', 'bg-green-400', 'text-white');
            console.log("Function executed " + (selectedSeats.length + 1) + " times.");
            const selectedButtonText = event.target.innerText;
            insertSeatInfo(selectedButtonText);
        } else {
            alert('You can only select up to 4 seats.');
        }
    } else {
        event.target.classList.remove('selected', 'bg-green-400', 'text-white');
        const selectedButtonText = event.target.innerText;
        removeSeatInfo(selectedButtonText);
    }

    const selectedCount = document.querySelectorAll('.selected').length;

    updateLeftSeatNumber(selectedCount);
    updateSelectedSeatNumber(selectedCount);
    updateTotalPrice(selectedCount);
    
    // Enable or disable apply coupon button based on the number of selected seats
    applyCouponButton.disabled = selectedCount < maxSeatsAllowed;
    
}

// remove seat
function removeSeatInfo(seatID) {
  const divToRemove = document.getElementById(`${seatID}-div`);
  if (divToRemove) {
      divToRemove.parentNode.removeChild(divToRemove);
  }
}

// Append seat info
function insertSeatInfo(seatID){
  const content1 = seatID;
const content2 = 'Economy';
const content3 = '550';

const htmlContent = `
   <div class="flex justify-between mt-6 mb-6 font-semibold" id="${seatID}-div">
            <p>${content1}</p>
            <p>${content2}</p>
            <p>${content3}</p>
        </div>
`;

const seatInfoDiv = document.getElementById('seat-info');

// Append the generated HTML content to the seat-info div
seatInfoDiv.innerHTML += htmlContent;
}

// update total price
function updateTotalPrice(seatCount){
  
  let price = seatCount* 550; 
  let totalPrice = document.getElementById("total-price")
  totalPrice.innerText = price;

  let grandTotal = document.getElementById("grand-total")
  grandTotal.innerText = price;
  
}
// Update grand total
function updateGrandTotal(discountPrice){
  let price = document.getElementById("total-price");
  let tPrice = parseInt(price.innerText);
  tPrice -= discountPrice;
  console.log(tPrice);
  let totalPrice = document.getElementById("grand-total")
  totalPrice.innerText = tPrice;
}
// apply coupon code
function discountedPrice(){
  const couponCode = document.getElementById("coupon");
  const coupon = couponCode.value;
  let discountPrice;
  console.log(coupon);
  if(coupon == 'NEW15')
  {
    document.getElementById("NEW15").classList.remove('hidden');
    let couponDiscountPrice = document.getElementById("Discounted-price-1");
    discountPrice = parseInt(couponDiscountPrice.innerText); 
    let divApply = document.getElementById("apply-coupon-div");
    divApply.classList.add("hidden");
    updateGrandTotal(discountPrice);

  }
  else if(coupon === 'Couple 20')
  {
    document.getElementById("Couple20").classList.remove('hidden');
    let couponDiscountPrice = document.getElementById("Discounted-price-2");
    discountPrice = parseInt(couponDiscountPrice.innerText);
    let divApply = document.getElementById("apply-coupon-div");
    divApply.classList.add("hidden");
    updateGrandTotal(discountPrice);
  }
  else{
    alert('This coupon is not valid.');
  }

  
}


// update seat left function
 function updateLeftSeatNumber(){
   var updateSeatNum = document.querySelectorAll(".selected");
   let num = parseInt(updateSeatNum.length);
   console.log(num);
   var seatNumber = 40;
   num = seatNumber - num;
   const leftSeat = document.getElementById("seat-left");
   leftSeat.innerText = num;
   
 }

function updateSelectedSeatNumber(){
  var updateSeatNum = document.querySelectorAll(".selected");
   let num = parseInt(updateSeatNum.length);
   const SelectSeatNum = document.getElementById("seat-select-num");
   SelectSeatNum.innerText = num;
   return num;
}

// this is code for seat selector
document.getElementById("A1").addEventListener("click", seatSelect);
document.getElementById("A2").addEventListener("click", seatSelect);
document.getElementById("A3").addEventListener("click", seatSelect);
document.getElementById("A4").addEventListener("click", seatSelect);
document.getElementById("B1").addEventListener("click", seatSelect);
document.getElementById("B2").addEventListener("click", seatSelect);
document.getElementById("B3").addEventListener("click", seatSelect);
document.getElementById("B4").addEventListener("click", seatSelect);
document.getElementById("C1").addEventListener("click", seatSelect);
document.getElementById("C2").addEventListener("click", seatSelect);
document.getElementById("C3").addEventListener("click", seatSelect);
document.getElementById("C4").addEventListener("click", seatSelect);
document.getElementById("D1").addEventListener("click", seatSelect);
document.getElementById("D2").addEventListener("click", seatSelect);
document.getElementById("D3").addEventListener("click", seatSelect);
document.getElementById("D4").addEventListener("click", seatSelect);
document.getElementById("E1").addEventListener("click", seatSelect);
document.getElementById("E2").addEventListener("click", seatSelect);
document.getElementById("E3").addEventListener("click", seatSelect);
document.getElementById("E4").addEventListener("click", seatSelect);
document.getElementById("F1").addEventListener("click", seatSelect);
document.getElementById("F2").addEventListener("click", seatSelect);
document.getElementById("F3").addEventListener("click", seatSelect);
document.getElementById("F4").addEventListener("click", seatSelect);
document.getElementById("G1").addEventListener("click", seatSelect);
document.getElementById("G2").addEventListener("click", seatSelect);
document.getElementById("G3").addEventListener("click", seatSelect);
document.getElementById("G4").addEventListener("click", seatSelect);
document.getElementById("H1").addEventListener("click", seatSelect);
document.getElementById("H2").addEventListener("click", seatSelect);
document.getElementById("H3").addEventListener("click", seatSelect);
document.getElementById("H4").addEventListener("click", seatSelect);
document.getElementById("I1").addEventListener("click", seatSelect);
document.getElementById("I2").addEventListener("click", seatSelect);
document.getElementById("I3").addEventListener("click", seatSelect);
document.getElementById("I4").addEventListener("click", seatSelect);
document.getElementById("J1").addEventListener("click", seatSelect);
document.getElementById("J2").addEventListener("click", seatSelect);
document.getElementById("J3").addEventListener("click", seatSelect);
document.getElementById("J4").addEventListener("click", seatSelect);