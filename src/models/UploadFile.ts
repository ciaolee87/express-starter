import {Table, Column, Model, HasMany, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {User} from "./User";


@Table({
    timestamps: true
})
export class UploadFile extends Model<UploadFile> {
    @ForeignKey(() => User)
    userId: number;

    @BelongsTo(() => User)
    user: User;

    // 파일의 절대 경로
    @Column({
        allowNull: false,
        defaultValue: ""
    })
    filePath: string;

    // 파일 사이즈
    @Column({
        allowNull: false,
        defaultValue: 0
    })
    fileSize: number;

    // 클라이언트 업로드 위치
    @Column({
        allowNull: false,
        defaultValue: ""
    })
    fieldName: string;
}
