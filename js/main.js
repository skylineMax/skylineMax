$(function () {
    $('.menuToggle').click(function () {
        $('html').addClass('menu-active');
        $('.menu').css('display', 'block');
        $('.close').css('display', 'block');
    });
    $('.close').click(function () {
        $('html').removeClass('menu-active');
        $('.menu').css('display', 'none');
        $('.close').css('display', 'none');
    });
    $('.menu a').click(function (e) {
        $('html').removeClass('menu-active');
        $('.menu').css('display', 'none');
        $('.close').css('display', 'none');
        e.preventDefault();
        var sectionID = e.currentTarget.id + "Section";
        $('html body').animate({
            scrollTop: $("#" + sectionID).offset().top
        },1000);

    });

});

