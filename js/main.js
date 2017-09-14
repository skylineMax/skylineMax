$(function () {
    $('.menuToggled').on('click', function () {
        $('.menu').slideToggle(300, function () {
            if($(this).css('display') === 'none') {
                $(this).removeAttr('style');
            }
        });
    });
    getToId();
});

function getToId() {
    $('.menu a').click(function (e) {
        e.preventDefault();
        var sectionID = e.currentTarget.id + "Section";
        $('html body').animate({
            scrollTop: $("#" + sectionID).offset().top
        },1000);

    });

}
