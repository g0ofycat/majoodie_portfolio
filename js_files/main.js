// ======== DROPDOWN ========

export const initDropdowns = () => {
	document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
		const button = dropdown.querySelector('[data-dropdown-button]');
		const menu = dropdown.querySelector('.dropdown-menu');

		button.addEventListener('click', () => {
			menu.classList.toggle('show');
		});
	});
};

// ======== GALLERY ========

export const initGallery = () => {
	const track = document.getElementById('carouselTrack');
	const cards = document.querySelectorAll('.gallery-card');
	const prevBtn = document.getElementById('prevBtn');
	const nextBtn = document.getElementById('nextBtn');
	const indicatorsContainer = document.getElementById('indicators');

	let currentIndex = 0;
	const totalCards = cards.length;

	for (let i = 0; i < totalCards; i++) {
		const indicator = document.createElement('div');
		indicator.classList.add('indicator');
		if (i === currentIndex) indicator.classList.add('active');
		indicator.addEventListener('click', () => goToSlide(i));
		indicatorsContainer.appendChild(indicator);
	}

	const indicators = document.querySelectorAll('.indicator');

	function updateCarousel() {
		const cardWidth = cards[0].offsetWidth;
		const trackStyle = window.getComputedStyle(track);
		const gap = parseFloat(trackStyle.gap);
		const offset = currentIndex * (cardWidth + gap);

		track.style.transform = `translateX(-${offset}px)`;

		cards.forEach((card, index) => {
			card.classList.toggle('active', index === currentIndex);
		});

		indicators.forEach((indicator, index) => {
			indicator.classList.toggle('active', index === currentIndex);
		});

		prevBtn.disabled = currentIndex === 0;
		nextBtn.disabled = currentIndex === totalCards - 1;
	}

	prevBtn.addEventListener('click', () => {
		currentIndex--;
		updateCarousel();
	});

	nextBtn.addEventListener('click', () => {
		currentIndex++;
		updateCarousel();
	});

	updateCarousel();

	window.addEventListener('resize', () => {
		currentIndex = 0;
		updateCarousel();
	});
};

// ======== CURSOR ========

export const initCursor = () => {
	const cursorFollower = document.querySelector('.cursor-follower');
	const speed = 0.15;
	let mouseX = 0;
	let mouseY = 0;
	let followerX = 0;
	let followerY = 0;

	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	function animateCursor() {
		followerX += (mouseX - followerX) * speed;
		followerY += (mouseY - followerY) * speed;

		cursorFollower.style.left = followerX + 'px';
		cursorFollower.style.top = followerY + 'px';

		requestAnimationFrame(animateCursor);
	}

	animateCursor();

	const interactiveElements = document.querySelectorAll('button, a, .carousel-btn, .indicator');

	interactiveElements.forEach(el => {
		el.addEventListener('mouseenter', () => {
			cursorFollower.classList.add('small');
		});

		el.addEventListener('mouseleave', () => {
			cursorFollower.classList.remove('small');
		});
	});
};

// ======== DROPDOWN ========

export const initLenis = () => {
	const lenis = new Lenis({
		duration: 1.2,
		direction: 'vertical',
		gestureDirection: 'vertical',
		smooth: true,
		smoothTouch: false,
		touchMultiplier: 2
	});

	const galleryBtn = document.querySelector('.main-button');

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	if (galleryBtn) {
		galleryBtn.addEventListener('click', () => {
			lenis.scrollTo('#gallery', {
				offset: 0,
				duration: 1.5,
			});
		});
	}
};

export const initTopbar = () => {
	let lastScroll = 0;

	window.addEventListener('scroll', () => {
		const currentScroll = window.pageYOffset;
		const topbar = document.querySelector('.topbar');

		if (currentScroll > 50) {
			topbar.classList.add('scrolled');
		} else {
			topbar.classList.remove('scrolled');
		}

		lastScroll = currentScroll;
	});
}