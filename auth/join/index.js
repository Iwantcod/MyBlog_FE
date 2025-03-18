import env, { loadEnv } from '/util/envLoadUtil.js'

async function init() {
    await loadEnv();
    const SERVER_URL = env.SERVER_URL; 

    // 유저네임 중복확인
    document.getElementById("check-username-btn").addEventListener("click", async function() {
        const username = document.getElementById("join-username").value;
    
        if (!username) {
            alert("아이디를 입력하세요.");
            return;
        }
    
        try {
            // 유저네임 중복검사
            const response = await fetch(`${SERVER_URL}/api/auth/check-username/${username}`, {
            method: "GET"
            });
    
            if (response.ok) {  // HTTP 200이면 사용 가능
                alert("사용 가능한 아이디입니다.");
    
                // 중복 검증 성공 시 '회원가입' 버튼을 활성화하고, 유저네임 입력하는 칸을 더 이상 수정할 수 없게 비활성화.
                document.getElementById("join-submit").disabled = false;
                document.getElementById("join-username").disabled = true;
            } else if (response.status === 409) { // HTTP 409이면 아이디 중복
                alert("이미 사용 중인 아이디입니다.");
                document.getElementById("join-submit").disabled = true;
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
                document.getElementById("join-submit").disabled = true;
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error:", error);
        }
    });
  
  
    // 회원가입 버튼 클릭
    document.getElementById("join-form").addEventListener("submit", async function(event) {
        event.preventDefault(); // 기본 폼 제출 동작을 막음
    
        // 입력값 가져오기
        const username = document.getElementById("join-username").value;
        const password = document.getElementById("join-password").value;
        const name = document.getElementById("join-name").value;
        const age = document.getElementById("join-age").value;
    
        // JSON 데이터 생성
        const requestData = {
            username: username,
            password: password,
            name: name,
            age: parseInt(age) // 나이는 정수형으로 변환
        };
    
        try {
            const response = await fetch(`${SERVER_URL}/api/auth/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // JSON 형식으로 전송
                },
                body: JSON.stringify(requestData) // 객체를 JSON 문자열로 변환
            });
    
            if (response.redirected) {
                alert("회원가입이 성공적으로 완료되었습니다!");
                window.location.href = response.url;
            } else if (response.status === 401){
                alert("회원가입 실패");
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
            }
        } catch (error) {
            alert("서버와의 통신 중 오류가 발생했습니다.");
            console.error("Error:", error);
        }
    });
}


init();