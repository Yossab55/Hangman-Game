// start with put words
let alphabeticalDiv = document.getElementById("words"),
  draw = document.getElementById("draw"),
  counterEnd = 0,
  counterWin = 0,
  winOrLose = false;
(correct = new Audio("audio/correct.mp3")),
  (wrong = new Audio("audio/wrong.mp3")),
  (endWin = new Audio("audio/end win.mp3")),
  (endLose = new Audio("audio/end lose.mp3")),
  (correctAnswer = false);

for (let i = "A".charCodeAt(); i <= "Z".charCodeAt(); i++) {
  let wordBox = document.createElement("div");
  wordBox.append(String.fromCharCode(i));
  alphabeticalDiv.append(wordBox);
}

fetch("data.json")
  .then((res) => {
    let myData = res.json();
    return myData;
  })
  .then((data) => {
    let randomObject = data[new Date() % 3];
    let category = document.getElementById("Category");
    category.innerText = `${randomObject.id}`;
    return randomObject;
  })
  .then((object) => {
    let randomElement = object[new Date() % 36];
    randomElement = randomElement.toUpperCase();
    size = randomElement.length;
    let wordSection = document.getElementById("w");
    for (let i = 0; i < size; i++) {
      let makeDiv = document.createElement("div");
      wordSection.append(makeDiv);
    }
    
    alphabeticalDiv.childNodes.forEach((e) => {
      e.addEventListener("click", function () {
        alphabeticalDiv.childNodes.forEach((e) =>
          e.removeEventListener("click", nothing)
        );
        e.classList = "clicked";
        let text = e.innerText;
        for (let i = 0; i < size; i++) {
          if (text === randomElement[i]) {
            wordSection.children[i].innerHTML = `${text}`;
            
            correct.play();
            correctAnswer = true;
            counterWin++;
            if (counterWin === size) {
              winOrLose = true;
              setTimeout(function () {
                endWin.play();
              }, 800);
              endGame(randomElement);
            }
          }
        }
        if (!correctAnswer) {
          wrong.play();
          draw.children[counterEnd].style.display = "block";
          counterEnd++;
          if (counterEnd == 9) {
            setTimeout(function () {
              endLose.play();
            }, 800);
            endGame(randomElement);
          }
        }
        correctAnswer = false;
      });
    });
  });

function endGame(r) {
  // cover layer
  let cover = document.createElement("div");
  cover.classList = "cover";
  document.body.append(cover);
  // end section when game end
  let endSection = document.createElement("end");
  endSection.classList = "end";
  // first span that till you win or you lost
  let spanWinOrLose = document.createElement("span");
  spanWinOrLose.append(`You `);
  let spanWinOrLoseWord = document.createElement("span");
  spanWinOrLoseWord.setAttribute("class", `${winOrLose ? "win" : "lose"}`);
  spanWinOrLoseWord.append(`${winOrLose ? "Won" : "Lost"}`);
  spanWinOrLose.append(spanWinOrLoseWord);
  endSection.append(spanWinOrLose);
  // show the word
  let spanWord = document.createElement("span");
  spanWord.append(`The word is ${r}`);
  endSection.append(spanWord);
  //  show your wrong tries
  let wrongFirstSpan = document.createElement("span");
  wrongFirstSpan.append(`Your Wrong Tries : `);
  let wrongSecondSpan = document.createElement("span");
  wrongSecondSpan.classList = "wrong";
  wrongSecondSpan.append(`${counterEnd}`);
  wrongFirstSpan.append(wrongSecondSpan);
  endSection.append(wrongFirstSpan);
  // ask for play again
  let spanPlayAgain = document.createElement("span");
  spanPlayAgain.append("Play Again ?");
  endSection.append(spanPlayAgain);
  // make div button
  let buttonDiv = document.createElement("div");
  buttonDiv.classList = "buttons";
  // make yes button
  let yesButton = document.createElement("button");
  yesButton.onclick = function () {
    window.location.reload();
  };
  yesButton.classList = "yes";
  yesButton.append("YES");
  buttonDiv.append(yesButton);
  // make no button
  let noButton = document.createElement("button");
  noButton.onclick = function () {
    window.close();
  };
  noButton.append("NO");
  noButton.classList = "no";
  buttonDiv.append(noButton);
  endSection.append(buttonDiv);
  document.body.append(endSection);
}
function nothing() {}
