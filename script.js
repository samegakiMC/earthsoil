document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       SCROLL ANIMATION
    ========================================= */

    const animatedElements = document.querySelectorAll(
        ".topic-card, .cycle-item"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    animatedElements.forEach((element) => {

        observer.observe(element);

    });


    /* =========================================
       ARTICLE URL
    ========================================= */

    const params =
        new URLSearchParams(window.location.search);

    const topic =
        params.get("topic");


    if (
        topic &&
        typeof showTopic === "function"
    ) {

        showTopic(topic);

    }


    /* =========================================
       NAVBAR SHADOW
    ========================================= */

    const navbar =
        document.querySelector(".navbar");


    window.addEventListener(
        "scroll",
        () => {

            if (!navbar) return;


            if (window.scrollY > 30) {

                navbar.style.boxShadow =
                    "0 10px 40px rgba(0,0,0,0.25)";

            } else {

                navbar.style.boxShadow = "none";

            }

        }
    );


    /* =========================================
       SMOOTH INTERNAL LINKS
    ========================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });

});
