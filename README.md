# 5Week-MiniProject.Backend

### 1. MVC 모델
![2022-06-15 23;58;34](https://user-images.githubusercontent.com/96379177/173859549-afe84c24-0a82-44c2-bc83-de0b769ee268.PNG)


M : model로 데이터를 처리한다. 우리는 이 것을 스키마로 배웠고 Model안에 데이터 처리 기준인 Schema를 작성하였다.
Schema에는 String일지 Number일지 정해야한다.

V : view에서 우리에게 보여지는 곳을 처리한다.
주로 jsp파일로 이루어져서 app.js 혹은 랜더링 라우터를 활용하여 서버와 연결한다.
이번 미니프로젝트는 view는 작성하지 않았다.

C : Controller는 중간에서 제어하는 역할을 한다.
API의 기능을 여기서 구현하였으며 유저 관련 기능, 게시물 기능, 댓글 기능, 좋아요 기능을 나누어 컨트롤러로 나누어 구현했다.

