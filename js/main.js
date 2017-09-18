$(function () {
    $('.menuToggle').click(function () {
        $('html').addClass('menu-active');
        $('.menu').css('display', 'flex');
        $('.close').css('display', 'block');
    });
    $('.menu a, .close').click(function () {
        $('html').removeClass('menu-active');
        $('.menu').hide(0,function () {
            if($(this).css('display') === 'none') {
                $(this).removeAttr('style');
            }
        });
        $('.close').css('display', 'none');
    });
    $('.menu a').click(function (e) {
        e.preventDefault();
        var sectionID = e.currentTarget.id + "Section";
        $('html body').animate({
            scrollTop: $("#" + sectionID).offset().top
        },1000);

    });

});

