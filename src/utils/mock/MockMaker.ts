import {EngWords, KoreanWords} from "./WordList";

export class MockMaker {

    getRadName(): string {
        let first = ['김', '이', '박', '최', '마', '류', '유', '손', '성', '문', '공', '라', '곽', '태'];
        let mid = KoreanWords;


        return first[Math.floor(first.length * Math.random())]
            + mid[Math.floor(mid.length * Math.random())];
    }

    getRndEmail(): string {
        return EngWords[Math.floor(EngWords.length * Math.random())]
            + EngWords[Math.floor(EngWords.length * Math.random())]
            + "@"
            + EngWords[Math.floor(EngWords.length * Math.random())]
            + "."
            + EngWords[Math.floor(EngWords.length * Math.random())];
    }


    getRndMemo(): string {
        let first = ['엄청나게 ', '굉장히 ', '최고로 ', '끔찍하게 ', '장난아니게 '];
        let mid = ['작은 ', '귀여운 ', '섹시한 ', '사랑스러운 ', '매력적인 ', '치명적인 ', '수치스러운 '];
        let last = ['파스타', '피자', '국수', '스테이크', '닭가슴살', '킹크랩'];


        return first[Math.floor(first.length * Math.random())]
            + mid[Math.floor(mid.length * Math.random())]
            + last[Math.floor(last.length * Math.random())];
    }

    getRndDate(): Date {
        let date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * 30));
        return date;
    }
}

