var level = 1;
var tries = 0;
var combi = [];
var buttons = $(".btn");

$(document).on("keydown", function (e) {
  if (e.key === "A") {
    console.log("start");
    setTimeout(startGame, 750);
  }
});

function new_level() {
  var next = Math.floor(Math.random() * 4);
  var button = buttons.get(next);
  combi.push(button);
  $("#level-title").text("Level " + level);
  animate(button);
}

function animate(button) {
  button.classList.add("pressed");

  setTimeout(function () {
    button.classList.remove("pressed");
  }, 200);
}

function startGame() {
  level = 1;
  tries = 0;
  combi = [];
  $(document).off("keydown");
  buttons.on("click", function (e) {
    animate(e.target);
    if (combi[tries] === e.target) {
      tries++;
      console.log("Nice");
      if (tries === level) {
        level++;
        tries = 0;
        console.log("next level");
        setTimeout(new_level, 750);
      }
    } else {
      console.log("Game lost");
      level = 0;
      fail();
    }
  });
  new_level();
}

function fail() {
  const audio = new Audio("/sounds/wrong.mp3");
  audio.play();

  $("#level-title").text("Game Over, Press any key to restart");

  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);

  buttons.off("click");

  $(document).on("keydown", function (e) {
    startGame();
  });
}

$("#yellow").click(function () {
  const audio = new Audio("/sounds/yellow.mp3");
  audio.play();
});

$("#green").click(function () {
  const audio = new Audio("/sounds/green.mp3");
  audio.play();
});

$("#red").click(function () {
  const audio = new Audio("/sounds/red.mp3");
  audio.play();
});

$("#blue").click(function () {
  const audio = new Audio("/sounds/blue.mp3");
  audio.play();
});
