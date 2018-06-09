/**
 * Huseyin KELES - 2018
 */

var Quad = {
    BOARD_WIDTH: 8,
    BOARD_HEIGHT:  12,
    BOARD_DIV: '',
    SCORE_SPAN: '',
    COLORS: ['red', 'blue', 'yellow', 'green'],
    SCORE: 0,
    CLICKED_1: '',
    CLICKED_2: '',

    init: function() {
        Quad.BOARD_DIV = $('#game');
        Quad.SCORE_SPAN = $('#score');
        Quad.drawBoard();
        Quad.inputs();
    },

    drawBoard: function() {
        for (var x = 0; x < Quad.BOARD_HEIGHT; x++) {
            for (var y = 0; y < Quad.BOARD_WIDTH; y++) {
                var box = $('<div id="b' + x + y + '" class="box" />');
                var color = Quad.COLORS[Math.floor(Math.random() * Quad.COLORS.length)]

                box.css('background', color);
                box.data('x', x);
                box.data('y', y);
                box.data('c', color);
                Quad.BOARD_DIV.append(box);
            }

            var clear = $('<div class="clear" />');
            Quad.BOARD_DIV.append(clear);
        }
    },

    inputs: function() {
        $('.box').click(function(){
            $(this).text('[●]');

            if (! Quad.CLICKED_1) {
                Quad.CLICKED_1 = $(this);
            } else {
                Quad.CLICKED_2 = $(this);
                Quad.check();
            }
        });
    },

    check: function() {
        var x1 = Quad.CLICKED_1.data('x');
        var y1 = Quad.CLICKED_1.data('y');
        var c1 = Quad.CLICKED_1.data('c');

        var x2 = Quad.CLICKED_2.data('x');
        var y2 = Quad.CLICKED_2.data('y');
        var c2 = Quad.CLICKED_2.data('c');

        // other corners
        var o1 = $('#b' + x1 + y2);
        var o2 = $('#b' + x2 + y1);

        var oc1 = o1.data('c');
        var oc2 = o2.data('c');

        if (
            c1 == c2
            && oc1 == oc2
            && x1 != x2
            && y1 != y2
        ) {
            Quad.win(x1, y1, x2, y2);
        }

        Quad.CLICKED_1 = '';
        Quad.CLICKED_2 = '';
        $('.box').text('');
    },

    win: function(x1, y1, x2, y2) {
        // swap values
        if (x1 > x2) {
            x1 = [x2, x2 = x1][0];
        }

        if (y1 > y2) {
            y1 = [y2, y2 = y1][0];
        }

        var score = (x2 - x1 + 1) * (y2 - y1 + 1);
        Quad.SCORE += score;
        Quad.drawScore();

        Quad.redraw(x1, y1, x2, y2);
    },

    drawScore: function() {
        Quad.SCORE_SPAN.text(Quad.SCORE);
    },

    redraw: function(x1, y1, x2, y2) {
        for (var x = x1; x <= x2; x++) {
            for (var y = y1; y <= y2; y++) {
                var box = $('#b' + x + y);
                var color = Quad.COLORS[Math.floor(Math.random() * Quad.COLORS.length)]
                box.css('background', color);
                box.data('c', color);
            }
        }
    }
};

window.addEventListener('load', Quad.init, false);
