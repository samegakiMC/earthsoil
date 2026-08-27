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
            height > 0
                ? (scrollTop / height) * 100
                : 0;

        if (progressBar) {

            progressBar.style.width =
                `${progress}%`;

        }

    }

    updateProgress();

    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    /* =========================
       BACK TO TOP
    ========================= */

    const topBtn =
        document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener(
            "scroll",
            () => {

                topBtn.classList.toggle(
                    "show",
                    window.scrollY > 500
                );

            },
            { passive: true }
        );


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
            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting)
                            return;

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealItems.forEach(
        item => {

            item.classList.add(
                "reveal"
            );

            revealObserver.observe(
                item
            );

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
            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (!entry.isIntersecting)
                            return;

                        const counter =
                            entry.target;

                        const target =
                            Number(
                                counter.dataset.count
                            );

                        const duration =
                            1200;

                        const start =
                            performance.now();


                        function tick(now) {

                            const progress =
                                Math.min(
                                    (now - start) /
                                    duration,
                                    1
                                );

                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );

                            counter.textContent =
                                Math.round(
                                    target * eased
                                );


                            if (progress < 1) {

                                requestAnimationFrame(
                                    tick
                                );

                            }

                        }


                        requestAnimationFrame(
                            tick
                        );


                        observer.unobserve(
                            counter
                        );

                    }
                );

            },
            {
                threshold: 0.7
            }
        );


    counters.forEach(
        counter =>
            counterObserver.observe(
                counter
            )
    );


    /* =========================
       CARD TILT
    ========================= */

    if (
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
    ) {

        document
            .querySelectorAll(
                ".topic-card, .impact-card, .solution-card"
            )
            .forEach(card => {


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


                        const rotateX =
                            (
                                (y -
                                    rect.height / 2) /
                                (rect.height / 2)
                            ) *
                            -2.5;


                        const rotateY =
                            (
                                (x -
                                    rect.width / 2) /
                                (rect.width / 2)
                            ) *
                            2.5;


                        card.style.transform =
                            `translateY(-8px)
                             perspective(900px)
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

    }


    /* =========================
       YOUTUBE
    ========================= */

    const youtubeCard =
        document.getElementById(
            "youtubeCard"
        );


    if (youtubeCard) {

        const videoId =
            youtubeCard.dataset.videoId;


        youtubeCard.addEventListener(
            "click",
            () => {

                if (
                    youtubeCard.classList.contains(
                        "playing"
                    )
                ) return;


                const iframe =
                    document.createElement(
                        "iframe"
                    );


                iframe.src =
                    `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;


                iframe.title =
                    "YouTube video";


                iframe.allow =
                    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";


                iframe.allowFullscreen =
                    true;


                youtubeCard.innerHTML =
                    "";


                youtubeCard.appendChild(
                    iframe
                );


                youtubeCard.classList.add(
                    "playing"
                );

            }
        );

    }

});
