export default class Menu {
	constructor() {}

	init() {
		this.menu = document.querySelector('.menu');
		if (this.menu) {
			this.addListeners();
		} else {
			return false;
		}

		this.burgerBtn = document.querySelector('[data-id=navbar]');
		if (this.burgerBtn) {
			this.addBtnListener();
		} else {
			return false;
		}
	}


	addListeners() {
		console.log('Добавляем слушателей');
		// Основные title
		const menuMainTitlesArr = document.getElementsByClassName('subtitle--with-content');

		menuMainTitlesArr.forEach(element => {
			element.addEventListener('click', (event) => {
				const clickedElement = event.currentTarget;
				clickedElement.classList.toggle('subtitle--with-content--active');
		
				this.openContent(clickedElement);	
			});
		});
	}

	openContent(clickedElement) {
		const content = clickedElement.nextSibling;
		content.classList.toggle('menu__list-sublist--dippest--active');
	}

	addBtnListener() {
		this.burgerBtn.addEventListener('click', (event) => {
			console.log('clickedElement');
			this.menu.classList.toggle('menu--active');
		});
	}
}
