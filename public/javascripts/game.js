var keyboardKeys = [];
keyboardKeys['scratch'] = ['firstbasic', 'secondbasic', 'thirdbasic', 'fourthbasic'];
keyboardKeys['block'] = ['firstblock', 'secondblock', 'thirdblock', 'fourthblock'];
keyboardKeys['paralyze'] = ['firstpara', 'secondpara', 'thirdpara', 'fourthpara'];

var attackDict = {};
var keys = {
  "A" : 65,
  "D" : 68,
  "S" : 83,
  "W" : 87,
};

var getKeyCode = function(k) { return keys[k]; }
function toCodeArray(str) { return str.split("").map(getKeyCode); }
attackDict['scratch']   = toCodeArray("WWWW");
attackDict['block']     = toCodeArray("AASA");
attackDict['paralyze']  = toCodeArray("SAWD");
console.log(attackDict);
var sequenceSoFar = [];
var count = 0;
var client = new Client();
console.log("count reset to zero");

function successfulPokemonAttack(pokemon, attack) {
  client.attack();
  $("div#textbox").text(pokemon + " successfully used " + attack + "!");
  count = 0;
  console.log("NEW");
  sequenceSoFar =[];
  setTimeout(function(){
    //jQuery lets you treat all elements of a class as one object
    $('.keyboard').css('background', '#222');
  }, 100);
}

function isSubArray(typedArray, givenMove) {
  if (typedArray.length == 0) {
    return true;
  } else if (typedArray[0] != givenMove[0]) {
    return false;
  } else {
    return isSubArray(typedArray.slice(1), givenMove.slice(1));
  }
}

function setupHealthBars() {
  var $youHealthBarContainer = $('#youhealthbar'),
  $opponentHealthBarContainer = $('#opponenthealthbar'),
  width  = $youHealthBarContainer.width(),
  height = $youHealthBarContainer.height(),
  youHealthPaper = Raphael($youHealthBarContainer[0], width, height),
  opponentHealthPaper = Raphael($opponentHealthBarContainer[0], width, height);

  var x = 0.1*width, y = 0.1*height, w = 0.8*width, h = 0.8*height;
  // health bar backgrounds
  youHealthPaper.rect(x,y,w,h).attr({'fill' : '#aaffaa'});
  opponentHealthPaper.rect(x,y,w,h).attr({'fill' : '#aaffaa'});

  // actual health bars
  var youHealthBar = youHealthPaper
  .rect(x,y,w,h)
  .attr({ fill : '#50dd50'}),

  opponentHealthBar = opponentHealthPaper
  .rect(x,y,w,h)
  .attr({ fill : '#50dd50'});

  youHealthBar.data('origHeight', .8*height);
  youHealthBar.data('origWidth', .8*width);
  opponentHealthBar.data('origHeight', .8*height);
  opponentHealthBar.data('origWidth', .8*width);
  $youHealthBarContainer.data('healthBar', youHealthBar);
  $opponentHealthBarContainer.data('healthBar', opponentHealthBar);
}

/*
 * healthBarContainer: health bar div
 * health: new health
 */
function setHealth($healthBarContainer, health) {
  // raphael rectangle health bar
  var rHealthBar = $healthBarContainer.data('healthBar'),
      rHealthBarPaper = rHealthBar.paper,
      oldParams = {
        x : rHealthBar.attr('x'),
        y : rHealthBar.attr('y'),
        width : rHealthBar.attr('width'),
        height: rHealthBar.attr('height')
      },
      newParams = {
        width : rHealthBar.data('origWidth')*health,
        height: rHealthBar.data('origHeight')
      },
      popWidth = 0.1 * oldParams.width,
      popHeight = 0.1 * oldParams.height;
  rHealthBar.animate({
    x : oldParams.x - popWidth/2,
    y : oldParams.y - popHeight/2,
    width : oldParams.width + popWidth,
    height : oldParams.height + popHeight
  }, 100, function() {
    rHealthBar.animate(oldParams, 100, function() {
      var hurtRect = rHealthBarPaper
      .rect(oldParams.x, oldParams.y, oldParams.width, oldParams.height)
      .attr({ fill : '#dd5050' }).insertBefore(rHealthBar);
      rHealthBar.animate(newParams, 300, function() {
        hurtRect.animate({ opacity : 0 }, 300, function() {
          hurtRect.remove();
        });
      });
    });
  });
}

function handleKeys() {
  $(document).keyup(function (e) {
    if (e.keyCode in keys) {
    return;
    }
    var beatTimeStamp = new Date().getTime(); //for now, until beat provided by Hai  
    if (!isAccuratePress(beatTimeStamp, new Date().getTime(), 500)) {
    console.log("NOT ACCURATE ENOUGH!");
    sequenceSoFar=[];
    count = 0;
    }
    sequenceSoFar.push(e.keyCode);
    console.log("SEQSOFAR", sequenceSoFar);
    if (e.keyCode == attackDict['block'][count] && isSubArray(sequenceSoFar, attackDict['block'])) {
    console.log(isSubArray(sequenceSoFar, attackDict['block']));
    document.getElementById(keyboardKeys['block'][count]).style.background = "#f00";
    count = count + 1;
    if (count == attackDict['block'].length) {
    var youpokemonel = $('#youpokemon')[0];
    var youpokemonelcopy = youpokemonel.src.toString()
    youpokemonel.src = "http://sprites.pokecheck.org/b/009.gif"
    var transitionendhandler = function(event) {
      console.log("normal")
        youpokemonel.src = "http://sprites.pokecheck.org/i/009.gif"
        youpokemonel.style.WebkitTransform = "scaleX(-1)";
    }
    youpokemonel.addEventListener("transitionend", transitionendhandler, true);
    successfulPokemonAttack("Pokepon", 'BLOCK');
    }
    }
    else if (e.keyCode == attackDict['scratch'][count] && isSubArray(sequenceSoFar, attackDict['scratch'])) {
      console.log(isSubArray(sequenceSoFar, attackDict['scratch'])); 
      document.getElementById(keyboardKeys['scratch'][count]).style.background = "#f00";
      count = count + 1;
      if (count == attackDict['scratch'].length) {
        console.log("SCRATCH");
        var youpokemonel = $('#youpokemon')[0];
        youpokemonel.style.transform = "scaleX(-1) translateX(-200px)";
        youpokemonel.style.OTransform = "scaleX(-1) translateX(-200px)";
        youpokemonel.style.MozTransform = "scaleX(-1) translateX(-200px)";
        youpokemonel.style.WebkitTransform = "scaleX(-1) translateX(-200px)";
        var transitionendhandler = function(event) {
          youpokemonel.style.transform = "scaleX(-1)";
          youpokemonel.style.OTransform = "scaleX(-1)";
          youpokemonel.style.MozTransform = "scaleX(-1)";
          youpokemonel.style.WebkitTransform = "scaleX(-1)";
        }
        youpokemonel.addEventListener("transitionend", transitionendhandler, true);
        sequenceSoFar =[];
        count = 0;
        successfulPokemonAttack("Pokepon", 'SCRATCH');
      }
    } 
    else if (e.keyCode == attackDict['paralyze'][count] && isSubArray(sequenceSoFar, attackDict['paralyze'])) {
      console.log(isSubArray(sequenceSoFar, attackDict['paralyze'])); 
      document.getElementById(keyboardKeys['paralyze'][count]).style.background = "#f00";
      count = count + 1;
      if (count == attackDict['paralyze'].length) {
        var youpokemonel = $('#youpokemon')[0];
        youpokemonel.style.WebkitTransform = "scaleX(-1) translateY(-100px)";
        var transitionendhandler = function(event) {
          youpokemonel.style.WebkitTransform = "scaleX(-1)";
        }
        youpokemonel.addEventListener("transitionend", transitionendhandler, true);
        successfulPokemonAttack("Pokepon", 'PARALYZE');
      }
    }else {
      $("div#textbox").text("YOU TYPED AN INVALID MOVE!");
      sequenceSoFar = [];
      count = 0;
      $('.keyboard').css('background', '#222');
      //user can't type for half a second
    }
    //given a timestamp of a beat, and timestamp of a keypress, and maxdelta, check if the difference is under maxdelta
    function isAccuratePress(beatTimeStamp, keyPressTimeStamp, maxDelta) {
      if ( Math.abs(beatTimeStamp - keyPressTimeStamp) <= maxDelta) {
        return true;
      }
      return false;
    }

    function isEqual(arr1, arr2) {
      if (arr1.length != arr2.length) {
        return false;
        for (var i = 0; i < arr1.length; i = i +1) {
        }
        if (arr1[i] != arr2[i]) {
          return false;
        }
      }
      return true;
    }
  });

}

$(function () {
    client.connect();

    setupHealthBars();
    handleKeys();

    // handle key presses

});
