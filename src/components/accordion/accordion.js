class Accordion {
    constructor() {
      this.accordion = document.getElementsByClassName(
        "accordion__element-title"
      );
    }
  
    init() {
        for (let i = 0; i < this.accordion.length; i++) {
            this.accordion[i].addEventListener("click", function () {
                this.classList.toggle("accordion__element-title--active");
                const panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
    }
}