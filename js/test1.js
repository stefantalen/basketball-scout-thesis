// Disable page moving
$(document).ready(function () {
    $(document).bind('touchmove', false);
    
    $(".roster .button").not('.disabled').on("click", function() {
        player = $(this).html();
        if (isMiss) {
            addFeedback("Speler "+ player +" mist");
            isMiss = false;
            player = null;
        } else if (isHit) {
            addFeedback("Speler "+ player +" raakt");
            isHit = false;
            player = null;
        } else {
            addFeedback("Speler "+ player +" geselecteerd");
        }
    });
});
var player = null,
    isMiss = false,
    isHit = false
;

var mc = new Hammer.Manager($('.court-background').get(0));
var pan = new Hammer.Pan();
var press = new Hammer.Press({time: 10});
var swipe = new Hammer.Swipe({velocity: 0.01, threshold: 0.1});

pan.recognizeWith(swipe);
mc.add([pan, swipe, press]);

mc.on("press", function(Event) {
    // If the target is an marker element, proceed to handling that action
    if (Event.target.className == 'action-miss') {
        addFeedback('Press');
        handleMiss();
    } else if (Event.target.className == 'action-hit') {
        addFeedback('Press');
        handleHit();
    } else if (
        $("body").hasClass( 'test-1-interaction' ) ||
        (isMiss == false &&
        isHit == false)
    ) {
        // If there is an position marker get it, otherwise create a new one
        var $marker =
            $(".court-background .marker.position").length == 1 ?
            $(".court-background .marker.position") : 
            $('<div class="marker position"><div class="action-rebound"></div><div class="action-hit"></div><div class="position"></div><div class="action-miss"></div></div>');
        
        $marker.show().css({
            top: Event.center.y - 32,
            left: Event.center.x - 32 - 12
        });
        if ($(".court-background .marker.position").length == 0) {
            $(".court-background").append($marker);
        }
        addFeedback("Positie ("+ $marker[0].offsetTop +","+ $marker[0].offsetLeft +") ingevoerd");
    }
});

if (!$("body").hasClass( 'test-1-position' )) {
    
    setInterval(function() {
        $(".marker.position").toggleClass( 'animated' );
    }, 250);
    
    mc.on("swipeleft", function(Event) {
        handleMiss();
    });
    
    /*
    mc.on("swiperight", function(Event) {
        console.log('rebound');
    });
    */
    
    mc.on("swipedown", function(Event) {
        handleHit();
    });
}

function addFeedback(string) {
    $(".feedback").append("<li>"+ string +"</li>");
}

function handleMiss() {
    var $marker = $(".marker.position").removeClass( 'position' ).addClass( 'missed' );
    if( $marker.length == 0) {
        return;
    }
    if (player) {   
        addFeedback("Speler "+ player +" mist");
        player = null;
    } else {
        addFeedback("Score mis");
        isMiss = true;
    }
}

function handleHit() {
    var $marker = $(".marker.position").removeClass( 'position' ).addClass( 'hit' );
    if( $marker.length == 0) {
        return;
    }
    if (player) {   
        addFeedback("Speler "+ player +" raakt");
        player = null;
    } else {
        addFeedback("Score raak");
        isHit = true;
    }
}

function showResults(variant, test, scene) {
    $.getJSON( "../../../../js/test1-results.json", function( data ) {
        console.log(data);
        for(person in data[variant]) {
            console.log(data[variant][person].name);
            var position = data[variant][person].results[test][scene -1];
            if (position.length) {
                for (shots in position) {
                    var position = data[variant][person].results[test][scene -1][shots];
                    createMarker(position.top, position.left, data[variant][person].color);
                }
            } else {
                createMarker(position.top, position.left, data[variant][person].color);
            }
        }
    });
}

function createMarker(top, left, color)
{
    var $marker = $('<div class="marker result"><div class="action-rebound"></div><div class="action-hit"></div><div class="position"></div><div class="action-miss"></div></div>');            
    $marker.show().css({
        top: top,
        left: left
    }).children('.position').css('backgroundColor', color);
    $(".court-background").append($marker);
}