$(document).ready(() => {
    setupClickHandler();
});

var timer = {
    running: false,
    inBreak: false,
    min: 25,
    sec: 0,
    handler: 0,
    elapsed: function () {
        if (this.sec == 0 && this.min > 0) {
            this.min--;
            this.sec = 59;
        } else if (this.sec == 0 && this.min == 0) {
            if (this.inBreak === false) {
                this.inBreak = true;
                this.sec = 0;
                this.min = $('#break-num').text();
                $('#display-title').text("Break!");
            } else {
                this.inBreak = false;
                this.sec = 0;
                this.min = $('#session-num').text();
                $('#display-title').text("Session");
            }
        } else {
            this.sec--;
        }
        this.updateUI();
    },
    stopTimer: function () {
        if (this.handler) {
            clearInterval(this.handler);
        }
    },
    setMin: function (min) {
        this.min = min;
        this.sec = 0;
        this.updateUI(true);
    },
    updateUI: function (noSec) {
        var $background = $('#background');
        var display = noSec ?
            this.min : this.min + ":" + (this.sec < 10 ? "0" + this.sec : this.sec);
        $("#display-minute").text(display);
        if (!timer.inBreak) {
            var perc = (this.min * 60 + this.sec) / ($('#session-num').text() * 60) * 100;
            $background.css('top', perc+'%');
            $background.css('backgroundColor', '#99CC00');
        } else {
            var perc = (this.min * 60 + this.sec) / ($('#break-num').text() * 60) * 100;
            $background.css('top', perc+'%' );
            $background.css('backgroundColor', 'rgb(255, 68, 68)');
        }
    }
}

function setupClickHandler() {
    var $breakNum = $('#break-num');
    var $sessionNum = $('#session-num');
    $('#break-minus').click(() => {
        if (timer.running) return;
        var val = $breakNum.text();
        if (val > 1) {
            $breakNum.text(Number(val) - 1);
            if (timer.inBreak)
                timer.setMin(Number(val) - 1);
        }
    });
    $('#break-plus').click(() => {
        if (timer.running) return;
        var val = $breakNum.text();
        $breakNum.text(Number(val) + 1);
        if (timer.inBreak)
            timer.setMin(Number(val) + 1);
    });
    $('#session-minus').click(() => {
        if (timer.running) return;
        var val = $sessionNum.text();
        if (val > 1) {
            $sessionNum.text(Number(val) - 1);
            if (!timer.inBreak)
                timer.setMin(Number(val) - 1);
        }
    });
    $('#session-plus').click(() => {
        if (timer.running) return;
        var val = $sessionNum.text();
        $sessionNum.text(Number(val) + 1);
        if (!timer.inBreak)
            timer.setMin(Number(val) + 1);
    });

    $('#display').click(function () {
        if (timer.running) {
            timer.stopTimer();
            timer.running = false;
        } else {
            timer.elapsed();
            timer.handler = setInterval(timer.elapsed.bind(timer), 1000);
            timer.running = true;
        }
    });
}