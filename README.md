## root 
루트 폴더에 다음 폴더 생성해주세요 
/pages

이곳에 static 파일들을 저장합니다

  
    
  
---
## 환경변수
개발, 운영서버에 환경변수값을 꼭 지정해준다
> NODE_ENV 환경변수를 값을 기준으로 .env 파일을 선택하여 그 이외의 환경변수 값을 수정하여 준다 
~~~
    개발서버
    export NODE_ENV=test
~~~

~~~
    운영 서버
    export NODE_ENV=production
~~~
