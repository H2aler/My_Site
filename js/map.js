// 지도 관련 기능
const MapModule = {
    init: function() {
        return initNaverMap();
    },
    // 추가 지도 관련 메서드들...
}; 

// 모바일 환경에서 지도 리사이즈 처리
window.addEventListener('resize', function() {
    if (map) {  // map 객체가 존재하는 경우
        map.relayout();  // 카카오맵의 경우
        // 또는
        map.resize();    // 네이버맵의 경우
    }
}); 

// 모바일 최�화를 위한 지도 설정
const initMobileMap = () => {
    const isMobile = window.innerWidth <= 768;
    
    if (map) {
        // 모바일에서의 지도 옵션
        const mobileOptions = {
            draggable: true,
            zoomControl: false,  // 줌 컨트롤 숨김
            scrollwheel: false   // 스크롤 줌 비활성화
        };

        // 성능 최적화
        const optimizeMapForMobile = () => {
            if (isMobile) {
                map.setOptions(mobileOptions);
                
                // 터치 이벤트 최적화
                let touchStartY;
                
                map.getElement().addEventListener('touchstart', (e) => {
                    touchStartY = e.touches[0].clientY;
                }, { passive: true });

                map.getElement().addEventListener('touchmove', (e) => {
                    const touchY = e.touches[0].clientY;
                    const scrollingDown = touchY < touchStartY;
                    
                    if (scrollingDown && map.getElement().scrollTop === 0) {
                        e.preventDefault();
                    }
                }, { passive: false });
            }
        };

        // 초기 설정 및 리사이즈 이벤트에 적용
        optimizeMapForMobile();
        window.addEventListener('resize', optimizeMapForMobile);
    }
};

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', initMobileMap); 