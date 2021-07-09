import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TestQuestionEntity } from './test-question.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'tests' })
export class TestEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})    
    id: Number;    

    @Column({ name: 'start_date', type: 'timestamp', nullable: true })
    startDate: Date;

    @Column({ name: 'end_date', type: 'timestamp', nullable: true })
    endDate: Date;

    @Column({ name: 'total_questions', type: 'int'})
    totalQuestions: Number;

    @Column({ name: 'total_correct_questions', type: 'int', nullable: true })
    totalCorrectQuestions: Number;

    @Column({ name: 'is_completed', type: 'boolean', default: false, nullable: true })
    isCompleted: boolean;

    @Column({ name: 'time_over', type: 'boolean', default: false, nullable: true})
    timeOver: boolean;

    @Column({ name: 'test_minutes', type: 'int'})
    testMinutes: Number;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------
    @ManyToOne(() => UserEntity, user => user.tests, {
        nullable: true
    })
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: UserEntity;

    @OneToMany(() => TestQuestionEntity, testQuestion => testQuestion.test, {
        onDelete: 'CASCADE'
    })
    testQuestions: TestQuestionEntity[];
}
