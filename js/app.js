//VARIABLES
// cards is a list that holds all of the cards 
var cards =  ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube",
            "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf",
            "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

// selectedCards is a list that holds cards once they have been selected 
var selectedCards=[];  

// Timer variables
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timerInterval;

// Moves variables
var movesLabel = document.querySelector(".moves");
var totalMoves = 0;
var totalMatched = 0;

// Star rating variables
var starRating =  document.querySelector(".stars");

//FUNCTIONS
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML 
 *   - add each card's HTML to the page in "prepareCardDeck" method below
 *   - start up timer
 */

 //
 shuffle(cards);
 prepareCardDeck();
 timerInterval = setInterval(setTime, 1000);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {    
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// prepareCardDeck function selects card deck and removes all existing cards replacing them with shuffled cards
 function prepareCardDeck() {  
  var deck = document.querySelector(".deck");  
  for (var i = 0; i < cards.length; i++) {
	 var card = deck.firstElementChild;
 	  deck.removeChild(card);

    li = document.createElement('li');
 	  li.setAttribute("class", "card");

    element = document.createElement("i");
    element.setAttribute("class", cards[i]);

    li.appendChild(element);
    deck.appendChild(li);
}
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

document.querySelector(".deck").addEventListener("click",function(element) {
  if(element.target && element.target.nodeName === "LI"){
    setTotalMoves();
    element.target.setAttribute("class", "card open show");   
   	openedCards = addSelectedCard(element);  
    if (openedCards.length === 2){
    	setTimeout(compareCards, 800, openedCards);  
    }    
	}
})	

function addSelectedCard(element) {
	var selectedCard =  element.target.firstElementChild;
	if (selectedCards.length === 0 || selectedCards.length === 1 ){	
		selectedCards.push(selectedCard);
	}
	return selectedCards;
}

function compareCards(array) {
	var i;
	var arr = [].slice.call(array);
	if (array.length === 2 && arr[0].isEqualNode(arr[1]) == true) {	
		var cardsOpenedShow = document.querySelectorAll(".card.open.show");
		[].forEach.call(cardsOpenedShow, function(el) {
   		 el.classList.add("match");      
		});		
		[].forEach.call(cardsOpenedShow, function(el) {
   		el.classList.remove("open");
		});
		[].forEach.call(cardsOpenedShow, function(el) {
   		 el.classList.remove("show");
		});
		while(selectedCards.length > 0) {
   		selectedCards.pop();
		}
		removeAllFromArray(selectedCards);
    ++totalMatched;
    if (totalMatched === 8) { 
       modal.style.display = "block";
       clearInterval(timerInterval);
    }
	}
	else {
		removeCards();
	}
}

function removeCards() {
	var cardsToRemove = document.querySelectorAll(".card.open.show");
	[].forEach.call(cardsToRemove, function(el) {
   	 el.classList.remove("open");
	});
	[].forEach.call(cardsToRemove, function(el) {
   	 el.classList.remove("show");
	});
	removeAllFromArray(selectedCards);
}

function removeAllFromArray(array){
	while(array.length > 0) {
   array.pop();
	}
}

//appendStars first removes any old stars and recreates 3 max stars during the reset process
 function appendStars() {   
  while (starRating.firstChild) {
        starRating.removeChild(starRating.firstChild);
  }
  for (var i = 0; i < 3 ; i++) {
    li = document.createElement('li');
    element = document.createElement("i");
    element.setAttribute("class", "fa fa-star");
    li.appendChild(element);
    starRating.appendChild(li);
  }
}
//SsetTotalMoves counts user total moves and updates this value, as well as updates user star rating based on the number of moves
function setTotalMoves() { 
  var star;
  if (totalMoves === 17) {
    star = starRating.firstElementChild;
    starRating.removeChild(star);
  } 
  else if (totalMoves === 34) {
    star = starRating.firstElementChild;
    starRating.removeChild(star);
  }
 else if (totalMoves === 51) {
    star = starRating.firstElementChild;
    starRating.removeChild(star);
  }
  ++totalMoves;
  movesLabel.innerHTML = totalMoves;
}

//setTime updatesSeconds and displays in the timer on the page
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));  
}

//pad is a generic method to add 0padding to the paaed in value
function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

//reset is responsible for recreating the game from the beginning, reshuffling cards, resetting time, moves counter and star rating
//reset gets executed on the restar button and when the final congratulations message is closed
function reset() {
  totalSeconds = 0;
  totalMoves = 0;
  totalMatched = 0;
  shuffle(cards);
  secondsLabel.innerHTML = pad(0);
  minutesLabel.innerHTML = pad(0);
  movesLabel.innerHTML = 0;
  timerInterval = setInterval(setTime, 1000);
  shuffle(cards);
  prepareCardDeck();
  appendStars();
}

document.querySelector(".restart").addEventListener("click",function(element) {
     reset();   
})

// Get the modal displayed at end of game
var modal = document.getElementById('congratsModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal and reset the game
span.onclick = function() {
    reset();
    modal.style.display = "none";
}
