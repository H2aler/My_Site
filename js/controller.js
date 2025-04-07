// 메인 컨트롤러
class SuminClinicController {
    constructor() {
        // 전역 설정 초기화
        this.config = {
            NAVER_MAP: {
                LAT: 37.6364799,
                LNG: 127.0318172,
                ZOOM: 18
            },
            MENU_CODE: 'm20230802044d96e2e665c'
        };

        // 모듈 초기화 상태
        this.initialized = {
            map: false,
            gallery: false,
            slider: false,
            animation: false,
            mobileMenu: false,
            visitLog: false
        };
    }

    // 모든 모듈 초기화
    async initializeAll() {
        try {
            // DOM이 로드되었는지 확인
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.init());
            } else {
                await this.init();
            }
        } catch (error) {
            console.error('초기화 중 오류 발생:', error);
        }
    }

    // 개별 모듈 초기화
    async init() {
        try {
            // 로딩 화면 표시
            document.body.classList.add('page_ready');

            // 모든 모듈 병렬 초기화
            await Promise.all([
                this.initMap(),
                this.initGallery(),
                this.initSlider(),
                this.initAnimations(),
                this.initMobileMenu(),
                this.initVisitLog()
            ]);

            // 이벤트 리스너 설정
            this.initEventListeners();

            // 로딩 화면 제거
            document.body.classList.remove('page_ready');

            console.log('모든 모듈이 성공적으로 초기화되었습니다.');
        } catch (error) {
            console.error('초기화 실패:', error);
            this.handleError(error);
        }
    }

    // 각 모듈 초기화 메서드
    async initMap() {
        try {
            await initNaverMap();
            this.initialized.map = true;
        } catch (error) {
            console.error('지도 초기화 실패:', error);
        }
    }

    async initGallery() {
        try {
            await initGallery();
            this.initialized.gallery = true;
        } catch (error) {
            console.error('갤러리 초기화 실패:', error);
        }
    }

    async initSlider() {
        try {
            await initMainSlider();
            this.initialized.slider = true;
        } catch (error) {
            console.error('슬라이더 초기화 실패:', error);
        }
    }

    async initAnimations() {
        try {
            await initScrollAnimation();
            this.initialized.animation = true;
        } catch (error) {
            console.error('애니메이션 초기화 실패:', error);
        }
    }

    async initMobileMenu() {
        try {
            await initMobileMenu();
            this.initialized.mobileMenu = true;
        } catch (error) {
            console.error('모바일 메뉴 초기화 실패:', error);
        }
    }

    async initVisitLog() {
        try {
            await addVisitLog();
            this.initialized.visitLog = true;
        } catch (error) {
            console.error('방문 로그 초기화 실패:', error);
        }
    }

    // 이벤트 리스너 초기화
    initEventListeners() {
        // 히스토리 관리
        handleHistory();
        
        // 북마크 기능
        handleBookmark();

        // 윈도우 리사이즈 이벤트
        window.addEventListener('resize', this.handleResize.bind(this));

        // 스크롤 이벤트
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    // 이벤트 핸들러
    handleResize() {
        // 리사이즈 시 필요한 작업 수행
        if (this.initialized.map) {
            // 지도 리사이즈 처리
        }
    }

    handleScroll() {
        // 스크롤 시 필요한 작업 수행
        if (this.initialized.animation) {
            // 애니메이션 관련 처리
        }
    }

    // 에러 처리
    handleError(error) {
        // 에러 로깅
        console.error('에러 발생:', error);

        // 사용자에게 알림
        if (error.critical) {
            alert('페이지 로드 중 문제가 발생했습니다. 페이지를 새로고침해주세요.');
        }

        // 에러 리포팅 서비스로 전송
        this.reportError(error);
    }

    // 에러 리포팅
    reportError(error) {
        // 에러 리포팅 로직
        console.log('에러 리포트:', error);
    }

    // 유틸리티 메서드들
    getInitializationStatus() {
        return this.initialized;
    }

    isAllInitialized() {
        return Object.values(this.initialized).every(status => status === true);
    }
}

// 컨트롤러 인스턴스 생성 및 초기화
const suminClinic = new SuminClinicController();
suminClinic.initializeAll();

// 전역 접근을 위한 내보내기
window.suminClinic = suminClinic;