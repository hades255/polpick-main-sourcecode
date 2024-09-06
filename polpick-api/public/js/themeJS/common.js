$(window).on('load', function() {
    if (feather) {
        feather.replace({
            width: 14,
            height: 14
        });
    }

    let times = $('.calc-time-diff');
    if (times.length) {
        times.each(function(){
            let currentHTML = $(this).html();
            if (currentHTML) {
                let hasUpdated = /updated/i.test(currentHTML);
                let shownTime = currentHTML.replace('Updated', '').trim();
                let oldtime = new Date(shownTime);
                calcTime($(this), oldtime, hasUpdated);
            }
        });
    }
});

function calcTime(item, time, hasUpdated) {
    if (moment(time).isSameOrBefore(moment().subtract(23, 'hours'))) {
        if (hasUpdated) {
            $(item).html(`Updated ${moment(time).format('dddd, Do of MMMM, YYYY - hh:mm A (Z)')}`);
        } else {
            $(item).html(`${moment(time).format('dddd, Do of MMMM, YYYY - hh:mm A (Z)')}`);
        }
    } else {
        setInterval(function(){
            if (hasUpdated) {
                $(item).html(`Updated ${moment(time).fromNow()}`);
            } else {
                $(item).html(`${moment(time).fromNow()}`);
            }
        }, 1000);
    }
}

