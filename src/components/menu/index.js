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
		const menuMainTitlesArr = document.getElementsByClassName('title__main');

		menuMainTitlesArr.forEach(element => {
			element.addEventListener('click', (event) => {
				const clickedElement = event.currentTarget.getAttribute('data-id');
				// const countryNumber = parseInt(clickedElement.getAttribute('id').split('_').pop(), 10);
		
				console.log(clickedElement);
			  });
		});
	}

	addBtnListener() {
		this.burgerBtn.addEventListener('click', (event) => {
			console.log('clickedElement');
			this.menu.classList.toggle('menu--active');
		});
	}
}
