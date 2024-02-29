import * as CrCromLib from "@crestron/ch5-crcomlib";

//Every time a buttom is pressed inside the 'sources' div, it's logged and sourcePressed is called
document.querySelector(".sources").addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    console.log("button was pressed");

    sourcePress(event.target.value);
  }

  //this stops the program from going 'up the levels' and stops here
  event.stopPropagation();
});

//Takes the number of the source that was pressed, then interlocks the rest of the buttons
function sourcePress(sourceNumber) {
  //makes sure the value passed is an integer
  const value = parseInt(sourceNumber, 10);

  //sends event to Crestron
  CrCromLib.publishEvent("n", "1", value);

  interlock(sourceNumber);
}

//Acts as an interlock, returning every button to its original state, then looking for the button that was pressed and setting it as 'active'
function interlock(sourceNumber) {
  let elements = document.getElementsByClassName("demoActive");

  Array.from(elements).forEach((element) => {
    document.querySelector(`#${element.id}`).className = "demo";
  });

  document.querySelector(`#src${sourceNumber}`).className = "demoActive";
}

/*
const button = document.querySelector(".demo");

button.addEventListener("click", function () {
  button.classList.replace("demo", "demoActive");

  //publish: HTML sends this event to simpl
  //'b' is boolean, '1' sends it to digital 1 in simpl, 'true' value goes high
  CrCromLib.publishEvent("b", "1", true);

  //After sending 'high' command, it waits 200 seconds and the it brings it down to 'low'
  //This shoudl be its own function (separation of concerns)
  setTimeout(() => CrCromLib.publishEvent("b", "1", false), 200);
});
*/
