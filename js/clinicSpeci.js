document.addEventListener('DOMContentLoaded', function () {
    // 의료 슬라이드 Swiper 초기화
    const medicalSwiper = new Swiper('.medical-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },
        navigation: false,
        pagination: {
            el: '.medical-swiper .swiper-pagination',
            clickable: true,
        },
        loop: true,
        effect: 'slide',
        grabCursor: true,
    });

    // 진료과목 슬라이더 Swiper 초기화
    const medicalFieldsSwiper = new Swiper('.medical-fields-slider', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        speed: 600,
        autoplay: {
            delay: 10000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.medical-fields-slider .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 'auto',
                spaceBetween: 15,
                centeredSlides: true
            },
            576: {
                slidesPerView: 'auto',
                spaceBetween: 20
            },
            768: {
                slidesPerView: 'auto',
                spaceBetween: 25
            },
            1024: {
                slidesPerView: 'auto',
                spaceBetween: 30
            }
        },
        loop: true,
        effect: 'slide',
        grabCursor: true,
        touchRatio: 1,
        longSwipes: true,
        longSwipesRatio: 0.3,
        touchAngle: 45,
        observer: true,
        observeParents: true,
        resizeObserver: true,
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2
        },
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        autoHeight: true,
        on: {
            init: function () {
                this.el.style.width = '100%';
            },
            resize: function () {
                this.update();
            }
        }
    });

    // 슬라이드 내용 동적 생성 방지 (기존 HTML 사용)
});

