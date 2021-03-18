/*	Javascript code for all elements
/*----------------------------------------------------*/


/* -------- Isotope Filtering -------- */
var $container = $('.isotope-gallery-container');
var $filter = $('.filter');
$(window).on('load', function () {
    // Initialize Isotope
    $container.isotope({
        itemSelector: '.gallery-item-wrapper'
    });
    $('.filter a').click(function () {
        var selector = $(this).attr('data-filter');
        var $iso_container = $(this).closest('.content-block,body').find('.isotope-gallery-container');
        $iso_container.isotope({ filter: selector });

        var $iso_filter = $(this).closest('.filter');
        $iso_filter.find('a').parent().removeClass('active');
        $(this).parent().addClass('active');
        return false;
    });
});
// End Isotope Filtering


