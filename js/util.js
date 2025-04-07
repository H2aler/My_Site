// main.js

// 전역 설정
const CONFIG = {
    NAVER_MAP: {
        LAT: 37.6364799,
        LNG: 127.0318172,
        ZOOM: 18
    },
    MENU_CODE: 'm20230802044d96e2e665c'
};

// 네이버 지도 초기화
const initNaverMap = () => {
    if (typeof naver !== 'undefined' && naver.maps) {
        const mapOptions = {
            center: new naver.maps.LatLng(CONFIG.NAVER_MAP.LAT, CONFIG.NAVER_MAP.LNG), // 수민의원 위치
            zoom: CONFIG.NAVER_MAP.ZOOM,
            zoomControl: true,
            mapTypeControl: true,
            scrollWheel: false,
            useStyleMap: true
        };

        const map = new naver.maps.Map('nmap_container', mapOptions);

        // 마커 설정
        const markerOptions = {
            position: new naver.maps.LatLng(CONFIG.NAVER_MAP.LAT, CONFIG.NAVER_MAP.LNG),
            map: map,
            icon: {
                url: "https://vendor-cdn.imweb.me/images/marker/marker_red.png",
                size: new naver.maps.Size(27, 35.5),
                origin: new naver.maps.Point(0, 0),
                scaledSize: new naver.maps.Size(27, 35.5)
            }
        };

        const marker = new naver.maps.Marker(markerOptions);

        // 정보창 설정
        const infoWindow = new naver.maps.InfoWindow({
            content: `
                <div class="map_info_box" style="padding: 5px 15px;">
                    <p class="title" style="font-size: 15px; font-weight: bold; margin-bottom: 0;">수민의원</p>
                    <p class="description" style="font-size: 13px; font-weight: 300; margin-bottom: 0;">2층</p>
                    <p class="address">서울특별시 강북구 한천로 977 2층</p>
                </div>
            `
        });

        infoWindow.open(map, marker);
    }
};

// 이미지 갤러리 초기화
const initGallery = () => {
    const galleryOptions = {
        selector: '._image_widget_lightbox',
        thumbnail: false,
        animateThumb: false,
        showThumbByDefault: false,
        mode: 'lg-fade',
        speed: 200,
        galleryId: 'img_lg'
    };

    $('body').lightGallery(galleryOptions);
};

// 메인 슬라이더 초기화
const initMainSlider = () => {
    $('.visual_section .slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000
    });
};

// 스크롤 애니메이션
const initScrollAnimation = () => {
    const animateElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    animateElements.forEach(element => observer.observe(element));
};

// 모바일 메뉴
const initMobileMenu = () => {
    const menuBtn = document.querySelector('.mobile_menu_btn');
    const mobileNav = document.querySelector('.mobile_nav_wrap');

    menuBtn?.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });
};

// 방문 로그 기록
const addVisitLog = () => {
    const visitedMenuCodes = JSON.parse(localStorage.getItem('visited_menu_codes')) || [];
    const currentMenuCode = CONFIG.MENU_CODE;

    if (!visitedMenuCodes.includes(currentMenuCode)) {
        visitedMenuCodes.push(currentMenuCode);
        localStorage.setItem('visited_menu_codes', JSON.stringify(visitedMenuCodes));
        
        // 방문 로그 API 호출
        SITE_VISIT_LOG.addVisitLog(
            document.referrer,
            '4QAU4odTSBtg4VMWQJf4oEU8cP44h+WeODfM3JSah/kxwuK5D2heprKwybSvwPPFmY0FGbJnL69jwIucyehXKQcnCC5yWMxcRehRD65EN/lE68TAIxbzUnRlqaU36me9',
            '6550',
            currentMenuCode,
            true
        );
    }
};

// 초기화 함수 수정
document.addEventListener('DOMContentLoaded', () => {
    // 페이지 로드 시 모든 기능 초기화
    const init = async () => {
        try {
            await Promise.all([
                initNaverMap(),
                initGallery(),
                initMainSlider(),
                initScrollAnimation(),
                initMobileMenu(),
                addVisitLog()
            ]);

            // 추가 이벤트 리스너 설정
            handleHistory();
            handleBookmark();
            
            // 로딩 화면 제거
            document.body.classList.remove('page_ready');
        } catch (error) {
            console.error('초기화 중 오류 발생:', error);
        }
    };

    init();
});

// 브라우저 히스토리 관리
const handleHistory = () => {
    if (history.replaceState && history.pushState) {
        const currentUrl = location.href.split('#')[0];
        
        // 라이트박스 갤러리 히스토리 관리
        $('body').on('onAfterOpen.lg', () => {
            history.pushState(null, null, currentUrl + '#gallery');
        });

        $('body').on('onCloseAfter.lg', () => {
            history.back();
        });
    }
};

// 북마크 기능
const handleBookmark = () => {
    $('._bookmark').on('click', (e) => {
        const bookmarkURL = window.location.href;
        const bookmarkTitle = document.title;

        if (window.sidebar && window.sidebar.addPanel) {
            window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
        } else if (window.external && ('AddFavorite' in window.external)) {
            window.external.AddFavorite(bookmarkURL, bookmarkTitle);
        } else {
            alert(`${navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? 'Cmd' : 'Ctrl'}+D 키를 눌러 북마크를 추가할 수 있습니다.`);
        }

        e.preventDefault();
    });
};

// 유틸리티 함수들
const utils = {
    isSafari: () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    isIos: () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    setCookie: (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    },
    getCookie: (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    },
    deleteCookie: (name) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    }
};