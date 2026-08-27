document.addEventListener("DOMContentLoaded", () => {


    /* =========================
       SCROLL PROGRESS
    ========================= */

    const progressBar =
        document.getElementById("progressBar");

    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (scrollTop / height) * 100;

        if (progressBar) {
            progressBar.style.width =
                progress + "%";
        }

    }

    window.addEventListener(
        "scroll",
        updateProgress
    );


    /* =========================
       BACK TO TOP
    ========================= */

    const topBtn =
        document.getElementById("topBtn");

    window.addEventListener(
        "scroll",
        () => {

            if (!topBtn) return;

            if (window.scrollY > 500) {

                topBtn.classList.add("show");

            } else {

                topBtn.classList.remove("show");

            }

        }
    );

    if (topBtn) {

        topBtn.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealItems =
        document.querySelectorAll(
            ".topic-card, .impact-card, .solution-card, .process-step"
        );

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealItems.forEach(
        item => {

            item.style.opacity = "0";

            item.style.transform =
                "translateY(30px)";

            item.style.transition =
                "opacity .7s ease, transform .7s ease";

            revealObserver.observe(item);

        }
    );


    /* =========================
       NUMBER COUNTER
    ========================= */

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) return;

                        const counter =
                            entry.target;

                        const target =
                            Number(
                                counter.dataset.count
                            );

                        let current = 0;

                        const duration = 1200;

                        const stepTime =
                            duration / target;

                        const timer =
                            setInterval(
                                () => {

                                    current++;

                                    counter.textContent =
                                        current;

                                    if (
                                        current >= target
                                    ) {

                                        clearInterval(
                                            timer
                                        );

                                    }

                                },
                                stepTime
                            );

                        counterObserver.unobserve(
                            counter
                        );

                    }
                );

            }
        );

    counters.forEach(
        counter =>
            counterObserver.observe(counter)
    );


    /* =========================
       CARD MOUSE EFFECT
    ========================= */

    const cards =
        document.querySelectorAll(
            ".topic-card, .impact-card, .solution-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2;

                card.style.transform =
                    `translateY(-8px)
                     perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =========================
       ARTICLE URL
    ========================= */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const topic =
        params.get("topic");

    if (
        topic &&
        typeof showTopic === "function"
    ) {

        showTopic(topic);

    }

});
