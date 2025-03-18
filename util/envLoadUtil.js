// env 정보를 담을 객체
const env = {};

// 환경변수 (env.json) 로드(Server Url Setter)
export async function loadEnv() {
    try {
        const response = await fetch('/env.json'); // env.json 파일에서 환경변수 로드
        const data = await response.json();

        // 가져온 환경변수 json 데이터를 env 객체에 할당
        Object.assign(env, data)
        return env;
    } catch (error) {
        console.error("Error loading env.json:", error);
    }
}

export default env;