// Disable page moving
$(document).ready(function () {
    $(document).bind('touchmove', false);
});

var mc = new Hammer.Manager($('.court-background').get(0));
var pan = new Hammer.Pan();
var press = new Hammer.Press({time: 10});
var swipe = new Hammer.Swipe({velocity: 0.01, threshold: 0.1});

pan.recognizeWith(swipe);
mc.add([pan, swipe, press]);

mc.on("press", function(Event) {
    // If there is an position marker get it, otherwise create a new one
    var $marker =
        $(".court-background .marker.position").length == 1 ?
        $(".court-background .marker.position") : 
        $('<div class="marker position"><div class="action-rebound"></div><div class="action-hit"></div><div class="position"></div><div class="action-miss"></div></div>');
    
    $marker.show().css({
        top: Event.center.y - 32,
        left: Event.center.x - 32
    });
    if ($(".court-background .marker.position").length == 0) {
        $(".court-background").append($marker);
    }
    addFeedback("Positie ingevoerd");
});

if (!$("body").hasClass( 'test-1-position' )) {
    
    setInterval(function() {
        $(".marker.position").toggleClass( 'animated' );
    }, 250);
    
    mc.on("swipeleft", function(Event) {
        addFeedback("Schot mis geregistreerd");
        var $marker = $(".marker.position").removeClass( 'position' ).addClass( 'missed' );
    });
    
    /*
    mc.on("swiperight", function(Event) {
        console.log('rebound');
    });
    */
    
    mc.on("swipedown", function(Event) {
        addFeedback('Schot raak geregistreerd');
        var $marker = $(".marker.position").removeClass( 'position' ).addClass( 'hit' );
    });
}

function addFeedback(string) {
    $(".feedback").append("<li>"+ string +"</li>");
}