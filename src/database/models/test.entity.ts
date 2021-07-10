import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TestQuestionEntity } from './test-question.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'tests' })
export class TestEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})    
    id: Number;    

    @Column({ type: 'timestamp', nullable: true })
    start_date: Date;

    @Column({ type: 'timestamp', nullable: true })
    end_date: Date;

    @Column({ type: 'int'})
    total_questions: Number;

    @Column({ type: 'int', nullable: true })
    total_correct_questions: Number;

    @Column({ type: 'boolean', default: false, nullable: true })
    is_completed: boolean;

    @Column({ type: 'boolean', default: false, nullable: true})
    time_over: boolean;

    @Column({ type: 'int'})
    test_minutes: Number;

    @Column({        
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;

    @Column({        
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;

    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------
    @ManyToOne(() => UserEntity, user => user.tests, {
        nullable: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: UserEntity;

    @OneToMany(() => TestQuestionEntity, testQuestion => testQuestion.test, {
        onDelete: 'CASCADE'
    })
    test_questions: TestQuestionEntity[];
}
