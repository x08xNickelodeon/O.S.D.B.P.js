const users = 14382;
const servers = 20;

jQuery(window).scroll(startCounter);

var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true)
		startCounter();
}, { threshold: [1] });

observer.observe(document.getElementById("servers"));
function startCounter() {
    var hT = jQuery('.love_counter').offset().top,
        hH = jQuery('.love_counter').outerHeight(),
        wH = jQuery(window).height();
    if (jQuery(window).scrollTop() > hT+hH-wH) {
        jQuery(window).off("scroll", startCounter);
        jQuery('.love_count').each(function () {
            var $this = jQuery(this);
			if(this.textContent.includes("+")){
				this.textContent = this.textContent.replace("+","");
			}
			if(this.classList.contains("servers")){
				jQuery({ Counter: 0 }).animate({ Counter: servers }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter) + '+');
					}
				});
			}
			else if(this.classList.contains("users")){
				jQuery({ Counter: 0 }).animate({ Counter: users }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter) + '+');
					}
				});
			}
        });
    }
}
