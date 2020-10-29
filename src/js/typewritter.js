Reveal.addEventListener('slidechanged', function(e) {
	if (e.currentSlide.getAttribute("data-state") === "start-typed") {
		let i = 0;
		let speed = 85; 
		let target = e.currentSlide.querySelector("#text-to-be-typed");
		let text = target.innerHTML;
		target.innerHTML = ' ';
		typeWriter();
		function typeWriter() {
			var page = Reveal.getIndices();
			if (i < text.length) {
			target.innerHTML += text.charAt(i);
				i++;
				setTimeout(typeWriter, speed);
			}
			else{
				Reveal.down();
			}

		}
		
	}
});
