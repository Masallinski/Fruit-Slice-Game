// jquery part
var playing = false;
var score = 0;
var trialsleft;
var step;
var action; // used setInterval

var fruits = ["apple","pear","grapes","cherry","pineapple","peach","orange"]

$(document).ready(function() {
    // click on start / reset button
    $("#startreset").click(function() {
        // we are playing  // are we playing?
        if(playing == true) {
        // yes 
         // reload page 
         location.reload();
        } else {
             // no
             // we are not playing
             playing = true;
             score = 0; // set score to 0
             $("#scorevalue").html(score);
              // show trials left 
              $("#trialsLeft").show();
              trialsleft = 3;
              addHearts();

              // hide game over box
              $("#gameOver").hide();
               // change button text to reset game
               $("#startreset").html("Reset Game");

                // 1.create a random fruit
                startAction();
        }
    })
});


   
     
         
     
        
        
        
         // define a random step
         // 2.more fruit down one step every 30sec
            // is fruit too low?
               //no -> repeat #2
               // yes -> any trials left?
                  // yes: repeat #1
                  // no: show game over, button text: start game

$("#fruit1").mouseover(function() {
    score++;
    $("#scorevalue").html(score); // update score
    document.getElementById('sliceSound').play();
    $("#sliceSound")[0].play(); // play sound

    // stop fruit
      clearInterval(action);

    //hide it

    $("#fruit1").hide("explode",500); // slide fruit

    // send new fruit
    setTimeout(startAction, 500);
})
  // explode fruit


//functions

// create hearts
function addHearts() {
    $("#trialsLeft").empty();
     for(i = 0; i < trialsleft; i++){
        $("#trialsLeft").append('<img src="images/heart2.png" class="life">');
    }
}

// start sending fruits
function startAction() {
    // generate a fruit
    $("#fruit1").show();
    chooseFruit(); // choose a random fruit
    $("#fruit1").css({'left': Math.round(550 * Math.random()), 'top': -50});
    // random position

       // generate a random step
       step = 1 + Math.round(5 * Math.random()) // change step

       // Moce fruit down by one step every 10 sec
       action = setInterval(function() {
        // move fruit by one step
        $("#fruit1").css('top', $("#fruit1").position().top + step);
        // ,ove fruit by one stop
            // check if the fruit is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()) {
                // chekc if we have trials left
                if(trialsleft > 1) {
                    // start sending fruits
                    function startAction() {
                   // generate a fruit
                    $("#fruit1").show();
                     chooseFruit(); // choose a random fruit
                    $("#fruit1").css({'left': Math.round(550 * Math.random()), 'top': -50});
                     // random position

                     // generate a random step
                    step = 1 + Math.round(5 * Math.random()) // change step
                }
                 // reduce trails by one
                  trialsleft --;

                  // populate trailsleft box
                  addHearts()
            } else { // no trails left
                playing = false; // we ae not playing anymore
                $("#startreset").html("Start Game"); // chnage button to Start Game
                $("#gameOver").show();
                $("#gameOver").html("<p>Game Over!</p><p>Your score is" + score + "</p>");
                $("#trialsLeft").hide();
                stopAction();


            }
        }
    },10);
}

// generate a random fruit
function chooseFruit() {
    $("#fruit1").attr("src","images/" + fruits[Math.round(6 * Math.random())] + ".png");

}

// Stop dropping fruits
function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
}