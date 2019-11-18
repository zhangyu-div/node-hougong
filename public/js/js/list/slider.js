class Slider{
    constructor() {
        this.aLi = $(".slider>ul>li");
    }
    init() {
        this.sliderEach();
        this.handleSliderClick(1) ;
    }
    sliderEach() {
        $.each(this.aLi, this.handleSliderEachCb.bind(this))
    }
    handleSliderEachCb(index) {
        this.aLi.eq(index).on("click", this.handleSliderClick.bind(this, index))
    }
    handleSliderClick(index) {
        this.aLi.eq(index).addClass("active").siblings().removeClass("active");
        switch (index) {
            case 0:
                new Home();
                break;
            case 1:
                new BooksList();
                break;
            case 2:
                new AddBooks();
                break;
            case 3:
                new ArticleBooks();
                break;
            case 4:
                new ArticleList();
                break;
            case 5:
                new User();
                break;
            default:
                new Home();
        }
    }
}
new Slider().init();