const form = document.querySelector('.form');
const nameInput = document.querySelector('#username');
const genderInput = document.querySelector('#gender');
const emailInput = document.querySelector('#email');
const arrivalTimeInput = document.querySelector('#arrivaltime');
const arrivalPlaceInput = document.querySelector('#arrivalplace');
const endPlaceInput = document.querySelector('#endplace');
const priceInput = document.querySelector('#price');
const passengerInput = document.querySelector('#passenger');
const way1Input = document.querySelector('#way1');
const noInput = document.querySelector('#no');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  try {
    const response = await fetch('/createride', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameInput.value,
        gender: genderInput.value,
        email: emailInput.value,
        arrivalTime: arrivalTimeInput.value,
        arrivalPlace: arrivalPlaceInput.value,
        endPlace: endPlaceInput.value,
        price: priceInput.value,
        numberOfPassengers: passengerInput.value,
        way1: way1Input.value,
        no: noInput.value
      })
    });
    const data = await response.json();
    console.log('Ride created successfully', data);
    alert('Ride created successfully');
    form.reset()
  } catch (error) {
    console.error('Error creating ride', error);
    alert('Error creating ride');
  }
});
