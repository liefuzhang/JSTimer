$(document).ready(() => {
    setupClickHandler();
});

var timer = {
    running: false,
    min: 25,
    sec: 0,
    handler: 0,
    elapsed: function () {
        if (this.sec == 0 && this.min > 0) {
            this.min--;
            this.sec = 59;
        } else {
            this.sec--;
        }
        $("#display-minute").text(this.min+":"+this.sec);
    },
    stopTimer: function () {
        if (this.handler) {
            clearInterval(this.handler);
        }
    }
}

function setupClickHandler() {
    var $breakNum = $('#break-num');
    var $sessionNum = $('#session-num');
    $('#break-minus').click(() => {
        var val = $breakNum.text();
        if (val > 1) $breakNum.text(Number(val) - 1);
    });
    $('#break-plus').click(() => {
        var val = $breakNum.text();
        $breakNum.text(Number(val) + 1);
    });
    $('#session-minus').click(() => {
        var val = $sessionNum.text();
        if (val > 1) $sessionNum.text(Number(val) - 1);
    });
    $('#session-plus').click(() => {
        var val = $sessionNum.text();
        $sessionNum.text(Number(val) + 1);
    });

    $('#display').click(function() {
        if (timer.running) {
            timer.stopTimer();
            timer.running = false;
        } else {
            timer.handler = setInterval(timer.elapsed.bind(timer), 1000);
            timer.running = true;
        }
    });
}