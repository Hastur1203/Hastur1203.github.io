const products = [
    {
        name: "もくもくソファー",
        category: "SOFA / 01",
        description: "雲をモチーフにした、やわらかな輪郭のソファー。絵本をよんだり、お友だちと並んだり。ほっとひと息つく場所に。",
        image: "img/imgsofa.webp",
        alt: "やわらかな曲線のラウンジチェアが置かれた居心地のよい空間"
    },
    {
        name: "くもの絵本棚",
        category: "BOOKSHELF / 02",
        description: "お気に入りの絵本と出会う、小さな読書コーナーに。雲のかたちが、おはなしの世界への入り口を彩ります。",
        image: "img/img_bookstand.webp",
        alt: "本と小物が並ぶ、明るく落ち着いた読書スペース"
    },
    {
        name: "もくもくランプ",
        category: "TABLE / 03",
        description: "空を漂う雲のランプがみんなを温かく照らします。",
        image: "img/img_lamp.webp",
        alt: "くものランプ"
    }
];

const faqs = [
    {
        question: "どんな家具を取り扱っていますか？",
        answer: "ソファー・本棚・遊具・テーブル・机・ハンガーラックなど、園での過ごし方に合わせた家具をご提案します。掲載アイテムはイメージの提案です。実際のラインナップは商品仕様が決まり次第ご案内します。"
    },
    {
        question: "サイズや色は選べますか？",
        answer: "サイズやカラーの選択肢、変更・オーダーへの対応範囲は、商品ごとに異なります。ご希望の設置場所やイメージをお聞きしたうえで、対応可能な内容をご案内します。"
    },
    {
        question: "普段のお手入れはどうすればよいですか？",
        answer: "素材ごとの清掃方法、使用できる洗剤や注意事項は、実際の商品仕様に合わせてご案内します。商品が決まりましたら、お手入れ方法をご確認ください。"
    },
    {
        question: "見積もりや納期について教えてください。",
        answer: "お見積もりの際は、ご希望の商品・数量・設置場所・希望時期などをお知らせください。納期の目安や配送・設置については、内容を確認のうえ個別にご案内します。"
    }
];

const productList = document.querySelector("#product-list");
const faqList = document.querySelector("#faq-list");

const featureGrid = document.querySelector(".feature-grid");
const proximityMedia = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");

if (featureGrid && proximityMedia.matches) {
    if (!window.gsap) {
        console.error("mocloud: GSAP could not be loaded; proximity icon animation is unavailable.");
    } else {
        const proximityIcons = [...featureGrid.querySelectorAll(".feature-icon")];
        const radius = 240;
        const iconAnimations = proximityIcons.map((icon) => {
            window.gsap.set(icon, { transformOrigin: "center center" });
            return {
                x: window.gsap.quickTo(icon, "x", { duration: 0.35, ease: "power3.out" }),
                y: window.gsap.quickTo(icon, "y", { duration: 0.35, ease: "power3.out" }),
                scaleX: window.gsap.quickTo(icon, "scaleX", { duration: 0.35, ease: "power3.out" }),
                scaleY: window.gsap.quickTo(icon, "scaleY", { duration: 0.35, ease: "power3.out" })
            };
        });

        const resetProximityIcons = () => {
            iconAnimations.forEach(({ x, y, scaleX, scaleY }) => {
                x(0);
                y(0);
                scaleX(1);
                scaleY(1);
            });
        };

        featureGrid.addEventListener("pointermove", (event) => {
            if (event.pointerType === "touch") return;

            proximityIcons.forEach((icon, index) => {
                const bounds = icon.getBoundingClientRect();
                const offsetX = bounds.left + bounds.width / 2 - event.clientX;
                const offsetY = bounds.top + bounds.height / 2 - event.clientY;
                const distance = Math.hypot(offsetX, offsetY);
                const influence = Math.max(0, 1 - distance / radius);
                const easedInfluence = influence * influence;
                const { x, y, scaleX, scaleY } = iconAnimations[index];

                x(distance ? (offsetX / distance) * easedInfluence * 14 : 0);
                y(distance ? (offsetY / distance) * easedInfluence * 14 : 0);
                scaleX(1 + easedInfluence * 0.65);
                scaleY(1 + easedInfluence * 0.65);
            });
        });

        featureGrid.addEventListener("pointerleave", resetProximityIcons);
    }
}

if (productList) {
    productList.innerHTML = products.map((product, index) => `
        <article class="product-row">
            <div class="product-visual">
                <img src="${product.image}" alt="${product.alt}" loading="lazy">
                <span class="product-index">0${index + 1}</span>
            </div>
            <div class="product-copy">
                <p class="product-kicker">${product.category}</p>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <a class="product-more" href="#contact">この家具について相談する <span aria-hidden="true">↗</span></a>
            </div>
        </article>
    `).join("");
}

if (faqList) {
    faqList.innerHTML = faqs.map((faq, index) => {
        const questionId = `faq-question-${index + 1}`;
        const answerId = `faq-answer-${index + 1}`;

        return `
            <article class="faq-item">
                <h3 class="faq-heading-line">
                    <button class="faq-question" id="${questionId}" type="button" aria-expanded="false" aria-controls="${answerId}">
                        <span class="faq-question-label"><span>Q${index + 1}</span>${faq.question}</span>
                        <span class="faq-icon" aria-hidden="true"></span>
                    </button>
                </h3>
                <div class="faq-panel" id="${answerId}" role="region" aria-labelledby="${questionId}" inert>
                    <div class="faq-panel-inner"><p>${faq.answer}</p></div>
                </div>
            </article>
        `;
    }).join("");

    faqList.addEventListener("click", (event) => {
        const button = event.target.closest(".faq-question");
        if (!button) return;

        const panel = document.getElementById(button.getAttribute("aria-controls"));
        const isExpanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!isExpanded));
        panel.classList.toggle("is-open", !isExpanded);
        panel.inert = isExpanded;
    });
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector("#site-navigation");

if (menuToggle && siteNavigation) {
    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "メニューを開く");
        siteNavigation.classList.remove("is-open");
    };

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "メニューを開く" : "メニューを閉じる");
        siteNavigation.classList.toggle("is-open", !isExpanded);
    });

    siteNavigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
}

const revealElements = document.querySelectorAll(".feature-card, .product-row, .contact-banner, .faq-item");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => {
        element.classList.add("js-reveal");
        revealObserver.observe(element);
    });
}