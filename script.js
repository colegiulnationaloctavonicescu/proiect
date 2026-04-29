document.addEventListener("DOMContentLoaded", function () {
	initNavigation();
	initParticles();
	initCounters();
	initScrollAnimations();
	initGallery();
	initMediaModal();
	initImageLoading();
	initVideoPreviewFrames();
	initLazyVideoLoading();
	initContactForm();
	initBackToTop();
	initSmoothScroll();
});

function initNavigation() {
	const navbar = document.getElementById("navbar");
	const navToggle = document.getElementById("navToggle");
	const navMenu = document.getElementById("navMenu");
	const navLinks = document.querySelectorAll(".nav-link");

	let lastScroll = 0;

	window.addEventListener("scroll", () => {
		const currentScroll = window.pageYOffset;

		if (currentScroll > 0) {
			navbar.classList.add("scrolled");
		} else {
			navbar.classList.remove("scrolled");
		}

		lastScroll = currentScroll;
	});

	navToggle.addEventListener("click", () => {
		navToggle.classList.toggle("active");
		navMenu.classList.toggle("active");
		document.body.classList.toggle("menu-open");
	});

	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			navToggle.classList.remove("active");
			navMenu.classList.remove("active");
			document.body.classList.remove("menu-open");
		});
	});

	navMenu.addEventListener("click", (e) => {
		if (e.target === navMenu) {
			navToggle.classList.remove("active");
			navMenu.classList.remove("active");
			document.body.classList.remove("menu-open");
		}
	});

	const sections = document.querySelectorAll("section[id]");

	window.addEventListener("scroll", () => {
		const scrollY = window.pageYOffset;

		sections.forEach((section) => {
			const sectionHeight = section.offsetHeight;
			const sectionTop = section.offsetTop - 150;
			const sectionId = section.getAttribute("id");

			if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
				navLinks.forEach((link) => {
					link.classList.remove("active");
					if (link.getAttribute("href") === `#${sectionId}`) {
						link.classList.add("active");
					}
				});
			}
		});
	});
}

function initParticles() {
	const particlesContainer = document.getElementById("particles");
	if (!particlesContainer) return;

	const particleCount = 18;

	for (let i = 0; i < particleCount; i++) {
		createParticle(particlesContainer);
	}
}

function createParticle(container) {
	const particle = document.createElement("div");
	particle.className = "particle";

	const size = Math.random() * 10 + 5;
	const left = Math.random() * 100;
	const delay = -Math.random() * 15;
	const duration = Math.random() * 10 + 10;

	particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;

	container.appendChild(particle);
}

function initCounters() {
	const counters = document.querySelectorAll(".stat-number");

	const observerOptions = {
		threshold: 0.5,
		rootMargin: "0px",
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				animateCounter(entry.target);
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element) {
	const target = parseInt(element.getAttribute("data-target"));
	const duration = 2000;
	const step = target / (duration / 16);
	let current = 0;

	const updateCounter = () => {
		current += step;
		if (current < target) {
			element.textContent = Math.floor(current).toLocaleString("ro-RO");
			requestAnimationFrame(updateCounter);
		} else {
			element.textContent = target.toLocaleString("ro-RO");
		}
	};

	updateCounter();
}

function initScrollAnimations() {
	const animatedElements = document.querySelectorAll("[data-aos]");

	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const delay = entry.target.getAttribute("data-aos-delay") || 0;
				setTimeout(() => {
					entry.target.classList.add("aos-animate");
				}, delay);
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	animatedElements.forEach((el) => {
		el.classList.add("aos-init");
		observer.observe(el);
	});

	const style = document.createElement("style");

	const isMobileViewport = window.matchMedia("(max-width: 980px)").matches;
	const fadeRightTransform = isMobileViewport ? "translateY(20px)" : "translateX(-30px)";
	const fadeLeftTransform = isMobileViewport ? "translateY(20px)" : "translateX(30px)";

	style.textContent = `
        .aos-init {
            opacity: 0;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .aos-init[data-aos="fade-up"] {
            transform: translateY(30px);
        }
        
        .aos-init[data-aos="fade-down"] {
            transform: translateY(-30px);
        }
        
        .aos-init[data-aos="fade-right"] {
            transform: ${fadeRightTransform};
        }
        
        .aos-init[data-aos="fade-left"] {
            transform: ${fadeLeftTransform};
        }
        
        .aos-init[data-aos="zoom-in"] {
            transform: scale(0.9);
        }
        
        .aos-animate {
            opacity: 1 !important;
            transform: translateY(0) translateX(0) scale(1) !important;
        }
    `;
	document.head.appendChild(style);
}

function initGallery() {
	const filterBtns = document.querySelectorAll(".filter-btn");
	const galleryItems = document.querySelectorAll(".gallery-item");

	filterBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const filter = btn.getAttribute("data-filter");

			filterBtns.forEach((b) => b.classList.remove("active"));
			btn.classList.add("active");

			galleryItems.forEach((item) => {
				const category = item.getAttribute("data-category");

				if (filter === "all" || category === filter) {
					item.style.display = "block";
					setTimeout(() => {
						item.style.opacity = "1";
						item.style.transform = "scale(1)";
					}, 10);
				} else {
					item.style.opacity = "0";
					item.style.transform = "scale(0.8)";
					setTimeout(() => {
						item.style.display = "none";
					}, 300);
				}
			});
		});
	});

	galleryItems.forEach((item) => {
		item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
	});
}

function initMediaModal() {
	const modal = document.getElementById("mediaModal");
	if (!modal) return;

	const modalBody = modal.querySelector(".modal-body");
	const closeBtn = modal.querySelector(".modal-close");
	const galleryItems = document.querySelectorAll(".gallery-item");

	const openModal = (mediaElement) => {
		if (!modalBody) return;

		modalBody.innerHTML = "";
		modalBody.appendChild(mediaElement);
		modal.classList.add("active");
		modal.setAttribute("aria-hidden", "false");
		document.body.classList.add("modal-open");
	};

	const closeModal = () => {
		modal.classList.remove("active");
		modal.setAttribute("aria-hidden", "true");
		document.body.classList.remove("modal-open");
		if (modalBody) {
			modalBody.innerHTML = "";
		}
	};

	galleryItems.forEach((item) => {
		item.addEventListener("click", () => {
			const image = item.querySelector("img");
			const video = item.querySelector("video");

			if (image) {
				const modalImage = document.createElement("img");
				modalImage.src = image.getAttribute("src");
				modalImage.alt = image.getAttribute("alt") || "Imagine din galerie";
				modalImage.className = "modal-media";
				openModal(modalImage);
				return;
			}

			if (video) {
				const modalVideo = document.createElement("video");
				modalVideo.src = video.getAttribute("src");
				modalVideo.className = "modal-media";
				modalVideo.controls = true;
				modalVideo.playsInline = true;
				modalVideo.preload = "metadata";
				openModal(modalVideo);
			}
		});
	});

	if (closeBtn) {
		closeBtn.addEventListener("click", closeModal);
	}

	modal.addEventListener("click", (event) => {
		if (event.target === modal) {
			closeModal();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && modal.classList.contains("active")) {
			closeModal();
		}
	});
}

function initImageLoading() {
	const images = document.querySelectorAll(".gallery-item img");

	images.forEach((img) => {
		const item = img.closest(".gallery-item");
		if (!item) return;

		const clearLoading = () => {
			item.classList.remove("is-loading");
		};

		item.classList.add("is-loading");

		if (img.complete && img.naturalWidth > 0) {
			clearLoading();
			return;
		}

		img.addEventListener("load", clearLoading, { once: true });
		img.addEventListener("error", clearLoading, { once: true });
	});
}

function initVideoPreviewFrames() {
	const videos = document.querySelectorAll(".video-player");

	videos.forEach((video) => {
		const previewTime = parseFloat(video.dataset.previewTime || "1");
		let previewReady = false;
		const card = video.closest(".video-card");

		video.autoplay = false;
		video.loop = false;

		const pauseWhileSeeking = () => {
			video.pause();
		};

		const capturePoster = () => {
			if (video.dataset.posterCaptured === "true") return;
			if (video.readyState < 2 || !video.videoWidth || !video.videoHeight) return;

			const canvas = document.createElement("canvas");
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;

			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

			try {
				video.setAttribute("poster", canvas.toDataURL("image/jpeg", 0.82));
				video.dataset.posterCaptured = "true";
			} catch (error) {
				return;
			}
		};

		const resetToStart = () => {
			video.pause();
			video.currentTime = 0;
		};

		const setPreviewFrame = () => {
			if (!Number.isFinite(video.duration) || video.duration <= 0) return;
			if (!Number.isFinite(previewTime)) return;

			const maxTime = Math.max(0, video.duration - 0.1);
			const seekTime = Math.min(previewTime, maxTime);
			video.pause();
			video.currentTime = seekTime;
		};

		const handleSeeked = () => {
			if (previewReady) return;
			previewReady = true;

			video.removeEventListener("seeking", pauseWhileSeeking);

			if (video.readyState >= 2) {
				capturePoster();
				resetToStart();
				if (card) {
					card.classList.remove("is-loading");
				}
			} else {
				video.addEventListener(
					"loadeddata",
					() => {
						capturePoster();
						resetToStart();
						if (card) {
							card.classList.remove("is-loading");
						}
					},
					{ once: true },
				);
			}
		};

		const handleFirstPlay = () => {
			if (video.dataset.started === "true") return;
			video.dataset.started = "true";
			if (video.currentTime > 0.1) {
				video.currentTime = 0;
			}
		};

		const handleVideoError = () => {
			if (card) {
				card.classList.remove("is-loading");
			}
		};

		video.addEventListener("loadedmetadata", setPreviewFrame, { once: true });
		video.addEventListener("seeking", pauseWhileSeeking);
		video.addEventListener("seeked", handleSeeked);
		video.addEventListener("play", handleFirstPlay);
		video.addEventListener("error", handleVideoError, { once: true });
	});
}

function initLazyVideoLoading() {
	const videos = document.querySelectorAll(".video-player");
	if (!videos.length) return;

	const loadVideo = (video) => {
		const src = video.getAttribute("data-src");
		if (!src || video.getAttribute("src")) return;

		const card = video.closest(".video-card");
		if (card) {
			card.classList.add("is-loading");
		}

		video.setAttribute("src", src);
		video.removeAttribute("data-src");
		video.load();
	};

	if (!("IntersectionObserver" in window)) {
		videos.forEach((video) => loadVideo(video));
		return;
	}

	const observer = new IntersectionObserver(
		(entries, currentObserver) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				const video = entry.target;
				loadVideo(video);
				currentObserver.unobserve(video);
			});
		},
		{
			rootMargin: "200px 0px",
			threshold: 0.1,
		},
	);

	videos.forEach((video) => observer.observe(video));
}

function initContactForm() {
	const form = document.getElementById("contactForm");
	if (!form) return;

	form.addEventListener("submit", (e) => {
		e.preventDefault();

		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;
		const message = document.getElementById("message").value;

		if (!name || !email || !message) {
			showNotification("Vă rugăm să completați toate câmpurile.", "error");
			return;
		}

		if (!isValidEmail(email)) {
			showNotification("Vă rugăm să introduceți o adresă de email validă.", "error");
			return;
		}

		const submitBtn = form.querySelector('button[type="submit"]');
		const originalText = submitBtn.innerHTML;
		submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Se trimite...';
		submitBtn.disabled = true;

		setTimeout(() => {
			showNotification("Mulțumim! Acesta este un formular demonstrativ (proiect educațional). Pentru contact real, utilizați datele din secțiunea Contact.", "success");
			form.reset();
			submitBtn.innerHTML = originalText;
			submitBtn.disabled = false;
		}, 1500);
	});

	function isValidEmail(email) {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}

	function showNotification(message, type) {
		const existing = document.querySelector(".notification");
		if (existing) existing.remove();

		const notification = document.createElement("div");
		notification.className = `notification notification-${type}`;
		notification.innerHTML = `
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
            <span>${message}</span>
        `;

		notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === "success" ? "#48bb78" : "#fc8181"};
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

		document.body.appendChild(notification);

		setTimeout(() => {
			notification.style.animation = "slideOut 0.3s ease forwards";
			setTimeout(() => notification.remove(), 300);
		}, 3000);
	}

	const style = document.createElement("style");

	style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
	document.head.appendChild(style);
}

function initBackToTop() {
	const backToTop = document.getElementById("backToTop");
	if (!backToTop) return;

	window.addEventListener("scroll", () => {
		if (window.pageYOffset > 500) {
			backToTop.classList.add("visible");
		} else {
			backToTop.classList.remove("visible");
		}
	});

	backToTop.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});
}

function initSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			if (targetId === "#") return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				const headerOffset = 80;
				const elementPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		});
	});
}

function initLazyLoading() {
	const lazyImages = document.querySelectorAll("img[data-src]");

	const imageObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.removeAttribute("data-src");
				observer.unobserve(img);
			}
		});
	});

	lazyImages.forEach((img) => imageObserver.observe(img));
}

function initTypingEffect() {
	const element = document.querySelector(".hero-subtitle");
	if (!element) return;

	const text = element.textContent;
	element.textContent = "";
	element.style.borderRight = "2px solid var(--secondary)";

	let index = 0;

	function type() {
		if (index < text.length) {
			element.textContent += text.charAt(index);
			index++;
			setTimeout(type, 50);
		} else {
			element.style.borderRight = "none";
		}
	}

	setTimeout(type, 1500);
}

function initParallax() {
	const parallaxElements = document.querySelectorAll("[data-parallax]");

	window.addEventListener("scroll", () => {
		const scrollY = window.pageYOffset;

		parallaxElements.forEach((element) => {
			const speed = parseFloat(element.getAttribute("data-parallax")) || 0.5;
			const offset = scrollY * speed;
			element.style.transform = `translateY(${offset}px)`;
		});
	});
}

document.querySelectorAll(".timeline-item").forEach((item, index) => {
	item.style.animationDelay = `${index * 0.2}s`;
});

document.querySelectorAll(".spec-card").forEach((card) => {
	card.addEventListener("mouseenter", function () {
		this.style.transform = "translateY(-10px) scale(1.02)";
	});

	card.addEventListener("mouseleave", function () {
		this.style.transform = "translateY(0) scale(1)";
	});
});

const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
	if (e.key === konamiCode[konamiIndex]) {
		konamiIndex++;

		if (konamiIndex === konamiCode.length) {
			activateEasterEgg();
			konamiIndex = 0;
		}
	} else {
		konamiIndex = 0;
	}
});

function activateEasterEgg() {
	const colors = ["#002b7f", "#fcd116", "#ce1126", "#c9a227"];

	for (let i = 0; i < 150; i++) {
		const confetti = document.createElement("div");
		confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -20px;
            z-index: 9999;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
		document.body.appendChild(confetti);

		setTimeout(() => confetti.remove(), 5000);
	}

	const style = document.createElement("style");

	style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
	document.head.appendChild(style);
}

function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

function throttle(func, limit) {
	let inThrottle;
	return function (...args) {
		if (!inThrottle) {
			func.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}
