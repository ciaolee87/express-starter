import {Table, Column, Model, BelongsTo, ForeignKey, HasMany} from 'sequelize-typescript';
import {Account} from "./Account";

@Table({timestamps: true})
export class Session extends Model<Session> {
    @ForeignKey(() => Account)
    accountId: number;

    // 서버에서 지정해주는 난수 값
    @Column({allowNull: false})
    deviceId: string;

    // 유저가 보내는 정보
    @Column({allowNull: false})
    deviceNm: string;

    // 접속 횟수
    @Column({defaultValue: 0, allowNull: false})
    count: number;

    @BelongsTo(() => Account)
    account: Account;

}
