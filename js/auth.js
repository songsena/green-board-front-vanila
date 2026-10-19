// 현재 로그인 여부 조회
function isLoggedIn() {
    // 로컬 스토리지에 엑세스 토큰이 존재하는 경우 true 반환
    // 그렇지 않은 경우 false 반환
    return Boolean(localStorage.getItem("accessToken"));
}

// 로그인 페이지로 리다이렉트 기능
function requireLogin() {
    if (isLoggedIn()) {
        return true;
    }
    location.replace("login.html");
    return false;
}

document.querySelector(".logout-button").addEventListener("click", logout)

async function logout() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/user/logout", {
            method: "POST", headers: {...getAuthHeaders(), "Content-Type": "application/json"}
        
        });
        if (!response.ok) {
        throw new Error("로그아웃에 실패했습니다.");
        }

        localStorage.removeItem("accessToken");
        location.href = "login.html";
    } catch (error) {
        alert(error.message);
    } finally {
        localStorage.removeItem("accessToken");
        location.href = "login.html";
    }
}

// Authorization Header 생성
function getAuthHeaders() {
    const accessToken = localStorage.getItem("accessToken");   
    return {
        Authorization: `Bearer ${accessToken}`
    }
}

// 로그인 상태에 따른 navigation UI 설정
function setupNavigation() {
    // 로그인 상태인 경우 -> 로그인 버튼 숨김
    document.querySelector(".login-link").hidden = isLoggedIn();
    // 로그아웃 상태인 경우 -> 로그아웃 버튼 숨김
    document.querySelector(".logout-button").hidden = !isLoggedIn();
    // 로그아웃 상태인 경우 -> 글쓰기 버튼 숨김
    document.querySelector(".write-link").hidden = !isLoggedIn();
    // 로그아웃 상태인 경우 -> 우측 nav의 게시판 버튼 숨김
    document.querySelector('nav > a[href="index.html"]').hidden = !isLoggedIn();

    // 게시판/글쓰기 등 모든 로그인이 필요한 메뉴는 로그인되어 있어야 노출되는것이 적합
}

setupNavigation();
