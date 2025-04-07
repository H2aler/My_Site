document.addEventListener('DOMContentLoaded', () => {
    // Swiper 인스턴스가 이미 생성되었는지 확인
    if (typeof Swiper === 'undefined') {
        console.error('Swiper is not defined. Please check if the Swiper library is included.');
        return;
    }

    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1, // 한 번에 보여줄 슬라이드 수
        spaceBetween: 20, // 슬라이드 간의 간격
        navigation: {
            nextEl: '.swiper-button-next', // 다음 버튼
            prevEl: '.swiper-button-prev', // 이전 버튼
        },
        pagination: {
            el: '.swiper-pagination', // 페이지네이션 요소
            clickable: true, // 클릭 가능
        },
        loop: true, // 루프 모드 활성화
        autoplay: {
            delay: 4000, // 4초마다 자동 슬라이드
            disableOnInteraction: false, // 사용자 상호작용 후에도 자동 슬라이드 계속
        }
    });

    // 슬라이드 전환 시 페이징 업데이트
    swiper.on('slideChange', () => {
        console.log('Slide changed to: ', swiper.activeIndex);
    });

    // 진료과목 슬��이더 설정
    $('.medical-fields-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,          // 자동 재생 활성화
        autoplaySpeed: 10000,    // 10초마다 슬라이드 전환
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});
