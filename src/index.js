// index.js

//import { error } from "happy-dom";

// Callbacks
const handleClick = (ramen) => {
  // Add code
  const detImage = document.querySelector('.detail-image')
  const detName = document.querySelector('.name')
  const detRestaurant = document.querySelector('.restaurant')
  const rarDisplay = document.getElementById('rating-display')
  const commentDisplay = document.getElementById('comment-display')

  detImage.src = ramen.image;
  detImage.alt =ramen.name;
  detName.textContent =ramen.name;
  detRestaurant.textContent = ramen.restaurant;
  rarDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;

  // document.getElementById('new-rating').value = ramen.rating
  // document.getElementById('new-comment').value = ramen.comment

  // const editForm = document.getElementById('new-ramen')
  // editForm.onsubmit = (e) =>{
  //   e.preventDefault();

  //   const updateRating = document.getElementById('new-rating').value;
  //   const updatedComment = document.getElementById('new-comment').value;
  //   rarDisplay.textContent = updateRating;
  //   commentDisplay.textContent = updatedComment
  // };


  const deleteButton =document.getElementById('delete-button');
  deleteButton.onclick = () => {
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenImage = ramenMenu.querySelector(`img[alt="${ramen.name}"]`);
    if(ramenImage){
      ramenMenu.removeChild(ramenImage)
    }

    detImage.src = './assets/image-placeholder.jpg';
    detName.textContent = '';
    detRestaurant.textContent = '';
    rarDisplay.textContent = '';
    commentDisplay.textContent = '';
  };
};

const addSubmitListener = () => {
  // Add code
  const form  = document.getElementById('new-ramen')
  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value
    }
    const ramenImg = document.createElement('img');
    ramenImg.src =newRamen.image;
    ramenImg.alt = newRamen.name;

    ramenImg.addEventListener('click', () => handleClick(newRamen))
    document.getElementById('ramen-menu').appendChild(ramenImg)
    form.reset();
  })
};

const displayRamens = () => {
  // Add code
  fetch('http://localhost:3000/ramens')
  .then((res) => res.json())
  .then((ramens) => {
    console.log('Fetched Ramens:', ramens)
    ramens.forEach((ramen) => {
      const ramenImg = document.createElement('img');
      ramenImg.src = ramen.image;
      ramenImg.alt = ramen.name;

      ramenImg.addEventListener('click', () => handleClick(ramen))
      document.getElementById('ramen-menu').appendChild(ramenImg)
    });
    if(ramens.length > 0){
      handleClick(ramens[0]);
    }
  })
  .catch((error) => {
    console.log ('Error Fetching:',error)
  })
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens();
  addSubmitListener();

}
document.addEventListener('DOMContentLoaded',main)
// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};



