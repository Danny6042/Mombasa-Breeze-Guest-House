/* =========================================================
   MOMBASA BREEZE GUEST HOUSE
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   WAIT FOR PAGE TO LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------------------------------
       ELEMENTS
    ------------------------------------------------------- */

    const preloader = document.getElementById("preloader");
    const siteHeader = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const backToTop = document.getElementById("backToTop");
    const bookingForm = document.getElementById("bookingForm");
    const currentYear = document.getElementById("currentYear");


    /* =====================================================
       PRELOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (preloader) {
                preloader.classList.add("hidden");
            }

        }, 500);

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNav.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle("menu-open", isOpen);

        });


        /* Close menu after clicking a link */

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove("menu-open");

            });

        });

    }


    /* =====================================================
       HEADER ON SCROLL
    ===================================================== */

    const handleHeaderScroll = () => {

        if (!siteHeader) return;

        if (window.scrollY > 60) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    };

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       BACK TO TOP BUTTON
    ===================================================== */

    const handleBackToTop = () => {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    };

    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       SMOOTH SCROLLING
    ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = siteHeader
                ? siteHeader.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        ".main-nav .nav-link"
    );


    const updateActiveNavigation = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            (siteHeader ? siteHeader.offsetHeight : 80) +
            100;


        sections.forEach(section => {

            const sectionTop = section.offsetTop;

            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const linkTarget =
                link.getAttribute("href");

            if (
                linkTarget === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       BOOKING FORM
    ===================================================== */

    if (bookingForm) {

        const checkin = document.getElementById("checkin");
        const checkout = document.getElementById("checkout");


        /* -------------------------------------------------
           Set minimum check-in date to today
        ------------------------------------------------- */

        const today = new Date();

        const todayString =
            today.toISOString().split("T")[0];


        if (checkin) {

            checkin.min = todayString;

        }


        /* -------------------------------------------------
           Checkout must be after check-in
        ------------------------------------------------- */

        if (checkin && checkout) {

            checkin.addEventListener("change", () => {

                if (!checkin.value) return;

                const selectedDate =
                    new Date(checkin.value);

                selectedDate.setDate(
                    selectedDate.getDate() + 1
                );

                const minimumCheckout =
                    selectedDate
                        .toISOString()
                        .split("T")[0];

                checkout.min = minimumCheckout;


                if (
                    checkout.value &&
                    checkout.value <= checkin.value
                ) {

                    checkout.value = "";

                }

            });

        }


        /* -------------------------------------------------
           FORM SUBMISSION
        ------------------------------------------------- */

        bookingForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById("name").value.trim();

                const phone =
                    document.getElementById("phone").value.trim();

                const checkinDate =
                    document.getElementById("checkin").value;

                const checkoutDate =
                    document.getElementById("checkout").value;

                const guests =
                    document.getElementById("guests").value;

                const room =
                    document.getElementById("room").value;

                const message =
                    document.getElementById("message").value.trim();


                /* -------------------------------------------------
                   Basic validation
                ------------------------------------------------- */

                if (
                    !name ||
                    !phone ||
                    !checkinDate ||
                    !checkoutDate ||
                    !guests ||
                    !room
                ) {

                    showNotification(
                        "Please fill in all required fields.",
                        "error"
                    );

                    return;

                }


                if (
                    new Date(checkoutDate) <=
                    new Date(checkinDate)
                ) {

                    showNotification(
                        "Check-out must be after check-in.",
                        "error"
                    );

                    return;

                }


                /* -------------------------------------------------
                   WhatsApp booking message
                ------------------------------------------------- */

                const hotelWhatsApp =
                    "254700000000";


                const whatsappMessage =
`Hello Mombasa Breeze Guest House,

I would like to make a booking enquiry.

Name: ${name}
Phone: ${phone}
Check-in: ${formatDate(checkinDate)}
Check-out: ${formatDate(checkoutDate)}
Guests: ${guests}
Room: ${room}

Additional message:
${message || "None"}

Please confirm availability and booking details.

Thank you.`;


                const whatsappURL =
                    `https://wa.me/${hotelWhatsApp}?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


                showNotification(
                    "Opening WhatsApp...",
                    "success"
                );


                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }, 700);

            }
        );

    }


    /* =====================================================
       GALLERY
    ===================================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    galleryItems.forEach(item => {

        item.addEventListener("click", event => {

            event.preventDefault();

            const image =
                item.querySelector("img");

            if (!image) return;

            openLightbox(
                image.src,
                image.alt
            );

        });

    });


    /* =====================================================
       ROOM CARD INTERACTION
    ===================================================== */

    const roomLinks =
        document.querySelectorAll(".room-link");


    roomLinks.forEach(link => {

        link.addEventListener("click", () => {

            const roomCard =
                link.closest(".room-card");

            if (!roomCard) return;

            const roomName =
                roomCard.querySelector("h3");

            const roomSelect =
                document.getElementById("room");


            if (
                roomName &&
                roomSelect
            ) {

                const roomText =
                    roomName.textContent.trim();


                const matchingOption =
                    Array.from(
                        roomSelect.options
                    ).find(
                        option =>
                            option.value === roomText
                    );


                if (matchingOption) {

                    roomSelect.value =
                        matchingOption.value;

                }

            }

        });

    });


    /* =====================================================
       ESC KEY
       Close mobile menu / lightbox
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;


        if (mainNav) {

            mainNav.classList.remove("open");

        }

        if (menuToggle) {

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        document.body.classList.remove("menu-open");


        closeLightbox();

    });


});


/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(dateString) {

    if (!dateString) return "";

    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "en-KE",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================================================
   NOTIFICATION
========================================================= */

function showNotification(
    message,
    type = "success"
) {

    const existing =
        document.querySelector(".site-notification");


    if (existing) {

        existing.remove();

    }


    const notification =
        document.createElement("div");


    notification.className =
        `site-notification ${type}`;


    notification.innerHTML = `

        <div class="notification-icon">

            ${
                type === "success"
                ? '<i class="fa-solid fa-check"></i>'
                : '<i class="fa-solid fa-circle-exclamation"></i>'
            }

        </div>

        <span>${message}</span>

        <button
            type="button"
            aria-label="Close notification">

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;


    document.body.appendChild(notification);


    requestAnimationFrame(() => {

        notification.classList.add("show");

    });


    const closeButton =
        notification.querySelector("button");


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            () => {

                notification.classList.remove("show");

                setTimeout(() => {

                    notification.remove();

                }, 300);

            }
        );

    }


    setTimeout(() => {

        if (
            document.body.contains(notification)
        ) {

            notification.classList.remove("show");

            setTimeout(() => {

                if (
                    document.body.contains(notification)
                ) {

                    notification.remove();

                }

            }, 300);

        }

    }, 4500);

}


/* =========================================================
   LIGHTBOX
========================================================= */

function openLightbox(
    imageSource,
    imageAlt
) {

    closeLightbox();


    const lightbox =
        document.createElement("div");


    lightbox.className =
        "image-lightbox";


    lightbox.innerHTML = `

        <button
            class="lightbox-close"
            aria-label="Close image">

            <i class="fa-solid fa-xmark"></i>

        </button>

        <img
            src="${imageSource}"
            alt="${imageAlt || "Gallery image"}">

    `;


    document.body.appendChild(lightbox);


    document.body.classList.add(
        "lightbox-open"
    );


    requestAnimationFrame(() => {

        lightbox.classList.add("show");

    });


    const closeButton =
        lightbox.querySelector(".lightbox-close");


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeLightbox
        );

    }


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


function closeLightbox() {

    const lightbox =
        document.querySelector(".image-lightbox");


    if (!lightbox) return;


    lightbox.classList.remove("show");


    document.body.classList.remove(
        "lightbox-open"
    );


    setTimeout(() => {

        if (
            document.body.contains(lightbox)
        ) {

            lightbox.remove();

        }

    }, 300);

}