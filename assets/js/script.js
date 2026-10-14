// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("show");

        menuToggle.textContent =
            navbar.classList.contains("show") ? "✕" : "☰";
    });

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("show");
            menuToggle.textContent = "☰";
        });
    });
}


// ===============================
// DARK / LIGHT MODE
// ===============================

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        themeToggle.textContent =
            isDark ? "☀️" : "🌙";
    });
}


// ===============================
// BACK TO TOP
// ===============================

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// ===============================
// PORTFOLIO FILTER
// ===============================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const portfolioItems =
    document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");

        portfolioItems.forEach(item => {

            const category =
                item.getAttribute("data-category");

            if (filter === "all" || category === filter) {

                item.style.display = "block";

                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                }, 10);

            } else {

                item.style.opacity = "0";
                item.style.transform = "scale(0.9)";

                setTimeout(() => {
                    item.style.display = "none";
                }, 300);
            }
        });
    });
});


// ===============================
// CONTACT FORM VALIDATION
// ===============================

const contactForm =
    document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name");

        const email =
            document.getElementById("email");

        const subject =
            document.getElementById("subject");

        const message =
            document.getElementById("message");

        const formMessage =
            document.getElementById("form-message");

        let valid = true;


        // Clear errors
        document.querySelectorAll(".error")
            .forEach(error => {
                error.textContent = "";
            });


        // Name
        if (name.value.trim() === "") {

            name.nextElementSibling.textContent =
                "Please enter your name.";

            valid = false;
        }


        // Email
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {

            email.nextElementSibling.textContent =
                "Please enter a valid email.";

            valid = false;
        }


        // Subject
        if (subject.value.trim() === "") {

            subject.nextElementSibling.textContent =
                "Please enter a subject.";

            valid = false;
        }


        // Message
        if (message.value.trim() === "") {

            message.nextElementSibling.textContent =
                "Please enter your message.";

            valid = false;
        }


        if (valid) {

            window.location.href = "mailto:ahad.jaheen@email.com?subject=" +
                encodeURIComponent(subject.value) + "&body=" +
                encodeURIComponent(message.value + "\n\n- " + name.value + " (" + email.value + ")");

            formMessage.textContent =
                "Thank you! Your email app is opening with your message.";

            formMessage.style.color = "#2ecc71";

            contactForm.reset();

        } else {

            formMessage.textContent =
                "Please correct the errors above.";

            formMessage.style.color = "#e74c3c";
        }

    });
}