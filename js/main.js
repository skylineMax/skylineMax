$(document).ready(function () {
    $('.menuToggle').click(function () {
        $('html').addClass('menu-active');
        $('.menu').css('display', 'flex');
        $('.close').css('display', 'block');
        $('.scrolltop').css('display', 'none');
    });
    $('.menu a, .close').click(function () {
        $('html').removeClass('menu-active');
        $('.menu').hide(0,function () {
            if($(this).css('display') === 'none') {
                $(this).removeAttr('style');
            }
        });
        $('.close').css('display', 'none');
        $('.scrolltop').css('display', 'block');
    });
    $('.menu a').click(function (e) {
        $('.scrolltop').css('display', 'block');
        e.preventDefault();
        var sectionID = e.currentTarget.id + "Section";
        $('html body').animate({
            scrollTop: $("#" + sectionID).offset().top
        },1000);

    });

    $('.scrolltop').on('click', function () {
        $('body, html').animate({
            scrollTop: 0
        }, 400);
    });

});


