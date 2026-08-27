document.addEventListener("DOMContentLoaded", () => {

    // Animation ตอนเลื่อนหน้า
    const cards = document.querySelectorAll(
        ".topic-card, .impact-card, .cycle-item"
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    cards.forEach(card => {
        observer.observe(card);
    });


    // ถ้าเปิด article.html?topic=...
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("topic");

    if (topic && typeof showTopic === "function") {
        showTopic(topic);
    }

});