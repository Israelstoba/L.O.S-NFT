////////////////IMAGE SCROLLER SCRIPT ///////////////
const images = document.querySelectorAll('.carousel__img');
const indicators = document.querySelectorAll('.indicator');
let currentImg = 0;
let currentIndicator = 0;

function changeImage() {
  images[currentImg].classList.remove('show-img');
  currentImg = (currentImg + 1) % images.length;
  images[currentImg].classList.add('show-img');

  indicators[currentIndicator].classList.remove('show-indicator');
  currentIndicator = (currentIndicator + 1) % indicators.length;
  indicators[currentIndicator].classList.add('show-indicator');
}
setInterval(changeImage, 3000);

////////////////// OWNED & STAKED DISPLAY SCRIPT ///////////

const ownedBtn = document.querySelector('.owned-tab');
const stakedBtn = document.querySelector('.staked-tab');
const ownedOuterCon = document.querySelector('.owned-outer-con');
const stakedOuterCon = document.querySelector('.staked-outer-con');
const tabBg = document.querySelector('.tab-bg');

stakedBtn.addEventListener('click', () => {
  ownedOuterCon.classList.remove('active-con');
  stakedOuterCon.classList.add('active-con');
  tabBg.style.right = '0';
});
ownedBtn.addEventListener('click', () => {
  ownedOuterCon.classList.add('active-con');
  stakedOuterCon.classList.remove('active-con');
  tabBg.style.right = '50%';
});

////////////////////// MODAL POP-UP SCRIPT ////////////////////
const modalOpen = document.querySelector('#modal-open');
const modalClose = document.querySelector('#modal-close');
const modal = document.querySelector('#modal');
const modalBg = document.querySelector('#overlay');

modalOpen.addEventListener('click', () => {
  modalBg.classList.add('active');
  modal.classList.add('active');
});

modalClose.addEventListener('click', () => {
  modalBg.classList.remove('active');
  modal.classList.remove('active');
});

modalBg.addEventListener('click', () => {
  modalBg.classList.remove('active');
  modal.classList.remove('active');
});

////////////// PROGRESS BAR SCRIPT //////////////////////

///////////// Set the start and end dates //////////
const stakedNftCard = document.querySelectorAll('.staked-img-card');
const startDate = new Date('2023-02-25');
const endDate = new Date('2023-07-15');
const today = new Date();

var addToStakedBtn = document.getElementsByClassName('owned-stake-btn');
for (var i = 0; i < addToStakedBtn.length; i++) {
  var button = addToStakedBtn[i];
  button.addEventListener('click', addToStakedBtnClicked);
}

function addToStakedBtnClicked(event) {
  var button = event.target;
  var ownedImgCardCon = button.parentElement.parentElement;
  var title =
    ownedImgCardCon.getElementsByClassName('owned-img-title')[0].innerText;
  var imageScr = ownedImgCardCon.getElementsByClassName('owned-img')[0].src;
  addImageToStaked(title, imageScr);
}

function addImageToStaked(title, imageScr) {
  var newImageCard = document.createElement('div');
  newImageCard.classList.add('staked-img-card');
  var stakedImageCard = document.getElementsByClassName(
    'staked-img-card-con'
  )[0];

  ///// To avoid addd more than one same Nft to the staked tab
  var alertBox = document.querySelector('.alert-msg-box');
  var alertBg = document.querySelector('.alert-overlay');
  var closeAlertBox = document.querySelector('.close-alert');
  var stakedImageTitle =
    stakedImageCard.getElementsByClassName('staked-img-title');
  for (var i = 0; i < stakedImageTitle.length; i++)
    if (stakedImageTitle[i].innerText == title) {
      alertBg.classList.add('show-alert-overlay');
      alertBox.classList.add('show-alert-box');

      closeAlertBox.addEventListener('click', () => {
        alertBg.classList.remove('show-alert-overlay');
        alertBox.classList.remove('show-alert-box');
      });

      alertBg.addEventListener('click', () => {
        alertBg.classList.remove('show-alert-overlay');
        alertBox.classList.remove('show-alert-box');
      });

      return;
    }

  var newImageCardContent = `
  <div class="staked-img__img-con">
  <img class="staked-img" src="${imageScr}" alt="" />
  </div>
  <br />
  <h5 class="staked-img-title">${title}</h5>
  <div class="progress-bar">
    <div class="progress" style="width: 0"></div>
    <span class="percentage-el">0%</span>
  </div>
  `;
  newImageCard.innerHTML = newImageCardContent;
  stakedImageCard.append(newImageCard);
}

///////////// Get the progress bar & percentage elements
const progressBar = document.querySelector('.progress');
const percentageEl = document.querySelector('.percentage-el');

///////////// Calculate the total number of days
const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

///////////// Calculate the current progress percentage
const percentageCalc = Math.round(
  ((today - startDate) / (1000 * 60 * 60 * 24) / totalDays) * 100
);

/////////// Update the progress bar and text
progressBar.style.width = percentageCalc + '%';
percentageEl.textContent = percentageCalc + '%';

//////////// Set an interval to update the progress bar every day
setInterval(() => {
  progressBar.style.width = percentageCalc + '%';
  percentageEl.textContent = percentageCalc + '%';

  if (percentageCalc == 100) {
    clearInterval(interval);
    percentageEl.textContent = '100' + '%';
  }
}, 86400000); //////////// 24 hours in milliseconds

/////////////////Update the progress bar automatically every day
setInterval(updateProgressBar, 24 * 60 * 60 * 1000); ////////// 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 1 day
