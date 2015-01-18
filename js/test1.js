var mc = new Hammer.Manager($('.court-background').get(0));
var pan = new Hammer.Pan();
var press = new Hammer.Press({time: 10});
var swipe = new Hammer.Swipe({velocity: 0.01, threshold: 0.1});

pan.recognizeWith(swipe);
mc.add([pan, swipe, press]);

mc.on("press", function(Event) {
    var $marker = $(".marker");
    
    $marker.show().css({
        top: Event.center.y - 32,
        left: Event.center.x - 32
    });
    addFeedback("Positie ingevoerd");
});
console.log($("body").hasClass( 'interaction' ));

mc.on("swipeleft", function(Event) {
    console.log('miss');
});
mc.on("swiperight", function(Event) {
    console.log('rebound');
});
mc.on("swipedown", function(Event) {
    console.log('score');
});

function addFeedback(string) {
    $(".feedback").append("<li>"+ string +"</li>");
}