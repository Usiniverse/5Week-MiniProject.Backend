// 유저 정보를 가져오는 함수
function getSelf(callback) {
    $.ajax({
        type: 'GET',
        url: '/api/users/me',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        success: function (response) {
            callback(response.user);
        },
        error: function (xhr, status, error) {
            // if (status == 401) {
            //     alert("로그인이 필요합니다.");
            if (error === 'Unauthorized') {
                alert(xhr.responseJSON['errorMessage']);
            } else {
                localStorage.clear();
                // alert(error.responseJSON.errorMessage);
                // alert(JSON.stringify(xhr.responseJSON["errorMessage"]));
                // alert(JSON.parse(request.responseText)["errorMessage"]);
                alert('알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.');
            }
            window.location.href = '/login';
        },
    });
}

// 기존 getSelf와 다른 점은, 비회원도 사용 가능 하게끔 localStorage 내에 token 값이 없어도 로그인 페이지로 돌려보내지 않도록 설정함.
function getSelfInfo(callback) {
    $.ajax({
        type: 'GET',
        url: '/api/users/me',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        success: function (response) {
            callback(response.user);
        },
        error: function (xhr, status, error) {
            console.log('비회원 입장');
        },
    });
}

// 로그아웃 함수
function signOut() {
    if (confirm('로그아웃 하시겠습니까?')) {
        alert('로그아웃 되었습니다.');
        localStorage.clear();
        window.location.href = '/login';
    } else {
        return false;
    }
}
