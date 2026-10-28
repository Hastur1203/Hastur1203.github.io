const products = [
	{
		name: "MELANCHOLY",
		label: "MEMORY",
		description: "雨上がりの空気と淡い記憶を思わせる、静かで透明感のある香り。",
		image: "https://placehold.jp/600x400.png?text=Item",
		number: "01"
	},
	{
		name: "EUPHORIA",
		label: "LIGHT",
		description: "心が解き放たれる瞬間をイメージした、軽やかで華やかな香り。",
		image: "https://placehold.jp/600x400.png?text=Item",
		number: "02"
	},
	{
		name: "SILENCE",
		label: "CALM",
		description: "夜の静寂と深い呼吸を感じさせる、落ち着きのある香り。",
		image: "https://placehold.jp/600x400.png?text=Item",
		number: "03"
	}
];

const reviews = [
	{
		product: "MELANCHOLY",
		text: "雨の日に似合う、少し懐かしい空気を感じる世界観が好きです。"
	},
	{
		product: "EUPHORIA",
		text: "気持ちを明るい方向へ切り替えたい日のイメージにぴったり。"
	},
	{
		product: "SILENCE",
		text: "静かな夜に自分の時間を大切にしたくなるコンセプトです。"
	}
];

const faqs = [
	{
		question: "香りはどのように選べますか？",
		answer: "その日の気分や纏いたい印象からお選びください。MELANCHOLY、EUPHORIA、SILENCEの3つの感情をテーマにしています。"
	},
	{
		question: "サンプルサイズはありますか？",
		answer: "EMOTION LABは授業用の架空ブランドです。現在、実際の販売やサンプル配布は行っていません。"
	},
	{
		question: "香りの持続時間はどれくらいですか？",
		answer: "本サイトの商品説明はコンセプトに基づく表現です。実際の香料を使用した持続時間の計測は行っていません。"
	}
];

const productGrid = document.querySelector("#product-grid");
const reviewGrid = document.querySelector("#review-grid");
const faqList = document.querySelector("#faq-list");

if (productGrid) {
	productGrid.innerHTML = products.map((product) => `
		<article class="product-card">
			<div class="product-image">
				<img src="${product.image}" alt="${product.name}のコンセプトイメージ">
				<span class="product-number">${product.number} / 03</span>
			</div>
			<div class="product-meta">
				<h3>${product.name}</h3>
				<span class="product-label">${product.label}</span>
			</div>
			<p>${product.description}</p>
		</article>
	`).join("");
}

if (reviewGrid) {
	reviewGrid.innerHTML = reviews.map((review) => `
		<article class="review-item">
			<div>
				<span class="review-quote-mark" aria-hidden="true">“</span>
				<blockquote>${review.text}</blockquote>
			</div>
			<div class="review-source">
				<img src="https://placehold.jp/150x150.png?text=User" alt="" loading="lazy">
				<span>SAMPLE / ${review.product}</span>
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
				<h3 class="faq-heading">
					<button class="faq-question" id="${questionId}" type="button" aria-expanded="false" aria-controls="${answerId}">
						<span class="faq-question-label"><span>Q${index + 1}</span>${faq.question}</span>
						<span class="faq-icon" aria-hidden="true"></span>
					</button>
				</h3>
				<div class="faq-panel" id="${answerId}" role="region" aria-labelledby="${questionId}" aria-hidden="true" inert>
					<div class="faq-panel-inner"><p>${faq.answer}</p></div>
				</div>
			</article>
		`;
	}).join("");

	faqList.addEventListener("click", (event) => {
		const button = event.target.closest(".faq-question");

		if (!button) {
			return;
		}

		const item = button.closest(".faq-item");
		const panel = document.getElementById(button.getAttribute("aria-controls"));
		const isExpanded = button.getAttribute("aria-expanded") === "true";

		button.setAttribute("aria-expanded", String(!isExpanded));
		item.classList.toggle("is-open", !isExpanded);
		panel.setAttribute("aria-hidden", String(isExpanded));
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
		if (event.target.closest("a")) {
			closeMenu();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeMenu();
		}
	});
}
