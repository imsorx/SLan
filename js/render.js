const remote = require('electron').remote;
const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
window.$ = window.jQuery = require('jquery');

$('#cls-btn').on('click', e => {
    remote.getCurrentWindow().close();
})


$('#msg').on('keypress', function (e) {
    var msg = $(this).val();
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (e.which == 13) {

        //passing data to Sender method
        sender(msg);

        //Updating HTML
        updateHTML(msg, 1);

        $(this).val("");

        //Autoscroll
        $("#chat-messages").animate({
            scrollTop: $('#chat-messages').prop("scrollHeight")
        }, 600);
    };
});


function updateHTML(data, key) {

    switch (key) {
        case 1:
            $('#chat-messages').append('<div class="message right"><img src="../src/me.png"/><div class="bubble">' + data + '<div class="corner"></div><span>Now</span></div></div>');
            break
        case 2:
            $('#chat-messages').append('<div class="message"><img src="../src/sender.png"/><div class="bubble">' + data + '<div class="corner"></div><span>Now</span></div></div>');
            break;
        default:
            break;
    }

}

function append_users(name, addr) {
    $("#friends #search").before('<div class="friend"><img src="./me.png" /><p><strong>' + name + '</strong><br><span>' + addr + '</span></p><div class="status"></div></div>');
}

$(document).ready(function () {

    $(".friend").each(function () {
        $(this).click(function () {
            var childOffset = $(this).offset();
            var parentOffset = $(this).parent().parent().offset();
            var childTop = childOffset.top - parentOffset.top;
            var clone = $(this).find('img').eq(0).clone();
            var top = childTop + 12 + "px";

            $(clone).css({
                'top': top
            }).addClass("floatingImg").appendTo("#chatbox");

            setTimeout(function () {
                $("#profile p").addClass("animate");
                $("#profile").addClass("animate");
            }, 100);
            setTimeout(function () {
                $("#chat-messages").addClass("animate");
                $('.cx, .cy').addClass('s1');
                setTimeout(function () {
                    $('.cx, .cy').addClass('s2');
                }, 100);
                setTimeout(function () {
                    $('.cx, .cy').addClass('s3');
                }, 200);
            }, 150);

            $('.floatingImg').animate({
                'width': "68px",
                'left': '108px',
                'top': '20px'
            }, 200);

            var name = $(this).find("p strong").html();
            var email = $(this).find("p span").html();
            $("#profile p").html(name);
            $("#profile span").html(email);

            $(".message").not(".right").find("img").attr("src", $(clone).attr("src"));
            $('#friendslist').fadeOut();
            $('#chatview').fadeIn();


            // Chat open scroll to bottom
            $('#chat-messages').scrollTop($('#chat-messages').prop("scrollHeight"));


            // Close Button
            $('#close').unbind("click").click(function () {
                $("#chat-messages, #profile, #profile p").removeClass("animate");
                $('.cx, .cy').removeClass("s1 s2 s3");
                $('.floatingImg').animate({
                    'width': "40px",
                    'top': top,
                    'left': '12px'
                }, 200, function () {
                    $('.floatingImg').remove()
                });

                setTimeout(function () {
                    $('#chatview').fadeOut();
                    $('#friendslist').fadeIn();
                }, 50);
            });
        });
    });
});

$('#abt-btn').on('click', function () {
    let child = new BrowserWindow({
        parent: remote.getCurrentWindow(),
        width: 290,
        height: 510,
        frame: false,
        modal: true,
        show: false
    });

    let loadpath = path.join('file://', __dirname, '../src/about.html');
    child.loadURL(loadpath)

    child.once('ready-to-show', () => child.show())
})