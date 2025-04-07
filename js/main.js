// main.js

class SuminClinic {
    constructor() {
        this.init();
    }

    init() {
        this.initSlider();
        this.initNavigation();
        this.initMap();
        window.addEventListener('load', () => document.body.classList.remove('page_ready'));
    }

    // 슬라이더 초기화
    initSlider() {
        $('.slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
    }

    // 네비게이션 스크롤 이벤트
    initNavigation() {
        const header = document.querySelector('.header');
        const navLinks = document.querySelectorAll('.gnb a');

        // 스크롤 이벤트
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // 네비게이션 클릭 이벤트
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // 네이버 지도 초기화
    initMap() {
        const mapContainer = document.getElementById('map');
        if (!mapContainer) return;

        // 수민의원 실제 좌표
        const location = new naver.maps.LatLng(37.6234, 127.0257); // 실제 좌표로 수정 필요
        
        const mapOptions = {
            center: location,
            zoom: 16,
            zoomControl: true,
            zoomControlOptions: {
                position: naver.maps.Position.TOP_RIGHT
            }
        };

        const map = new naver.maps.Map(mapContainer, mapOptions);
        
        // 마커 추가
        const marker = new naver.maps.Marker({
            position: location,
            map: map,
            title: '수민의원'
        });

        // 정보창 추가
        const contentString = [
            '<div class="iw_inner" style="padding: 10px;">',
            '   <h3 style="margin-bottom: 5px;">수민의원</h3>',
            '   <p>서울특별시 강북구 한천로 977 2층<br />',
            '   Tel: 02-1234-5678</p>',
            '</div>'
        ].join('');

        const infowindow = new naver.maps.InfoWindow({
            content: contentString,
            maxWidth: 300,
            backgroundColor: "#fff",
            borderColor: "#888",
            borderWidth: 2,
            anchorSize: new naver.maps.Size(20, 10),
            anchorSkew: true,
            pixelOffset: new naver.maps.Point(20, -20)
        });

        naver.maps.Event.addListener(marker, "click", function() {
            if (infowindow.getMap()) {
                infowindow.close();
            } else {
                infowindow.open(map, marker);
            }
        });
    }

    // 에러 핸들링
    handleError(error) {
        console.error('에러가 발생했습니다:', error);
        // 필요한 경우 사용자에게 에러 메시지 표시
    }
}

// 인스턴스 생성
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.suminClinic = new SuminClinic();
    } catch (error) {
        console.error('초기화 중 에러가 발생했습니다:', error);
    }
});

// 모바일 메뉴 토글 기능
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const gnb = document.querySelector('.gnb');
    
    menuToggle.addEventListener('click', function() {
        gnb.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // 화면 크기 변경 시 메뉴 상태 초기화
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            gnb.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // 메뉴 항목 클릭 시 모바일 메뉴 닫기
    const menuItems = gnb.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                gnb.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
});