// ===== Gallery Page: Filter Buttons =====

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-box");

filterButtons.forEach(button => {

	button.addEventListener("click", function () {

		filterButtons.forEach(btn => btn.classList.remove("active"));
		this.classList.add("active");

		const filter = this.dataset.filter;

		galleryItems.forEach(item => {

			if (filter === "all") {

				item.style.display = "block";

			} else {

				if (item.classList.contains(filter)) {

					item.style.display = "block";

				} else {

					item.style.display = "none";

				}

			}

		});

	});

});


// ===== Static Portfolio Demo Forms =====

document.addEventListener("DOMContentLoaded", function () {

	document.querySelectorAll("form").forEach(function (form) {

		form.addEventListener("submit", function (event) {

			event.preventDefault();

			const button = form.querySelector(
				'button[type="submit"], input[type="submit"]'
			);

			const originalText = button ? button.textContent : "";

			if (button) {
				button.textContent = "Submitted ✓";
			}

			setTimeout(function () {

				if (button) {
					button.textContent = originalText || "Submit";
				}

			}, 2000);

		});

	});

});


// ===== SingaTours Gallery Lightbox + Category Filters =====

document.addEventListener("DOMContentLoaded", () => {

	const lightbox = document.querySelector("#imageLightbox");
	const lightboxImg = document.querySelector("#lightboxImage");
	const caption = document.querySelector("#lightboxCaption");

	const galleryImages = [
		...document.querySelectorAll(
			".gallery-item img, .detail-gallery img, [data-lightbox]"
		)
	];

	let current = 0;


	// ===== Open Lightbox =====

	function openBox(index) {

		if (!lightbox || !galleryImages.length) {
			return;
		}

		current = index;

		const img = galleryImages[current];

		lightboxImg.src = img.currentSrc || img.src;
		lightboxImg.alt = img.alt || "";

		if (caption) {
			caption.textContent =
				img.dataset.caption || img.alt || "";
		}

		lightbox.classList.add("open");
		document.body.style.overflow = "hidden";
	}


	// ===== Close Lightbox =====

	function closeBox() {

		if (!lightbox) {
			return;
		}

		lightbox.classList.remove("open");
		document.body.style.overflow = "";
	}


	// ===== Move Between Images =====

	function move(step) {

		if (!galleryImages.length) {
			return;
		}

		current =
			(current + step + galleryImages.length) %
			galleryImages.length;

		openBox(current);
	}


	// ===== Gallery Image Click =====

	galleryImages.forEach((img, index) => {

		img.addEventListener("click", event => {

			event.preventDefault();
			openBox(index);

		});

	});


	// ===== Lightbox Controls =====

	document
		.querySelector("#lightboxClose")
		?.addEventListener("click", closeBox);

	document
		.querySelector("#lightboxPrev")
		?.addEventListener("click", () => move(-1));

	document
		.querySelector("#lightboxNext")
		?.addEventListener("click", () => move(1));


	// ===== Close Lightbox When Clicking Outside Image =====

	lightbox?.addEventListener("click", event => {

		if (event.target === lightbox) {
			closeBox();
		}

	});


	// ===== Keyboard Controls =====

	document.addEventListener("keydown", event => {

		if (!lightbox?.classList.contains("open")) {
			return;
		}

		if (event.key === "Escape") {
			closeBox();
		}

		if (event.key === "ArrowLeft") {
			move(-1);
		}

		if (event.key === "ArrowRight") {
			move(1);
		}

	});


	// ===== Gallery Category Filters =====

	document
		.querySelectorAll(".gallery-filter")
		.forEach(button => {

			button.addEventListener("click", () => {

				document
					.querySelectorAll(".gallery-filter")
					.forEach(btn => {
						btn.classList.remove("active");
					});

				button.classList.add("active");

				const category = button.dataset.filter;

				document
					.querySelectorAll(".gallery-item[data-category]")
					.forEach(item => {

						item.classList.toggle(
							"is-hidden",
							category !== "all" &&
							item.dataset.category !== category
						);

					});

			});

		});

});