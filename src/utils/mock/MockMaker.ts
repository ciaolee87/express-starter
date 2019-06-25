import * as assert from "assert";

export class ReceiptMockMaker {
    getMock(): MockReceipt {
        const mock: MockReceipt = {
            id: 0,
            lati: 37 + Math.random() * 2,
            long: 126 + Math.random(),
            memo: this.getRndMemo(),
            regAt: this.getRndDate(),
            version: 0,
            categoryId: Math.floor(Math.random() * 5) + 1,
            currency: Math.floor(Math.random() * 100) * 100
        };
        return mock;
    }

    assertMock(m1: any, m2: any) {
        assert.strictEqual(m1.lati, m2.lati);
        assert.strictEqual(m1.long, m2.long);
        assert.strictEqual(m1.memo, m2.memo);
        assert.strictEqual(m1.categoryId, m2.categoryId);
        assert.strictEqual(m1.currency, m2.currency);

    }

    private getRndMemo(): string {
        let first = ['엄청나게 ', '굉장히 ', '최고로 ', '끔찍하게 ', '장난아니게 '];
        let mid = ['작은 ', '귀여운 ', '섹시한 ', '사랑스러운 ', '매력적인 ', '치명적인 ', '수치스러운 '];
        let last = ['파스타', '피자', '국수', '스테이크', '닭가슴살', '킹크랩'];


        return first[Math.floor(first.length * Math.random())]
            + mid[Math.floor(mid.length * Math.random())]
            + last[Math.floor(last.length * Math.random())];
    }

    private getRndDate(): Date {
        let date = new Date();
        date.setDate(date.getDate() + Math.floor(Math.random() * 30));
        return date;
    }
}

export interface MockReceipt {
    id: number;
    version: number;
    lati: number;
    long: number;
    memo: string;
    regAt: Date;
    categoryId: number;
    currency: number;
}
