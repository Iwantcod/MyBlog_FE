import env, { loadEnv } from '/util/envLoadUtil.js'

async function init() {
    await loadEnv();
    const SERVER_URL = env.SERVER_URL;

    // 회원가입 버튼 클릭 시 '/join' 요청하여 회원가입페이지 로드
    document.getElementById("join-btn").addEventListener("click", () => {
        window.location.href = `${SERVER_URL}/auth/join`;
    });

    document.getElementById("login-form").addEventListener("submit", async function(event) {
        event.preventDefault(); // 기본 form 제출 동작 방지

        const form = event.target;
        const formData = new FormData(form); // form 데이터를 가져옴

        try {
            const response = await fetch(`${SERVER_URL}/api/auth/login`, {
                method: "POST",
                body: formData // form 데이터를 그대로 전송 (x-www-form-urlencoded 방식)
            });


            if (response.redirected) {
                alert("로그인에 성공했습니다!"); // 로그인 성공 시 alert 띄우기
                console.log(response.url);
                window.location.href = response.url;
            } else {
                alert("아이디와 비밀번호가 일치하지 않습니다.");
            }

        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error:", error);
        }
    });

    document.getElementById("google-login-btn").addEventListener("click", function() {
        // OAuth2 공급자 등록 id가 "google"인 경우, 아래 URL로 리다이렉션
        window.location.href = `${SERVER_URL}/oauth2/authorization/google`;
        
    });
}

init();