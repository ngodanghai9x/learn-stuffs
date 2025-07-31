var submitedDays = ['0207','2107','2507','0707','0907','1107','2907'].map((val) => ` js-${val}2025`);
console.log('🚀 ~ submitedDays:', submitedDays);

document.querySelectorAll('div').forEach((div) => {
    const className = div.className || '';
    if (/cdate\s+-(mon|tue|wed|thu|fri)\s+js-\d{8}/i.test(className)) {
        // if (/cdate\s+-(mon|tue|wed|thu|fri|sat|sun)\s+js-\d{8}/i.test(className)) {

        if (
            submitedDays.some((day) => {
                return className.includes(String(day));
            })
        ) {
            div.style.background = 'blue';
        }
    }
});
