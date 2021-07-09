import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TestQuestionEntity } from './test-question.entity';

@Entity({ name: 'test_answers' })
export class TestAnswerEntity {    

    @PrimaryGeneratedColumn('uuid')
    id: string;    

    @Column({ type: 'varchar', length: 100 })
    option: string;
   
    @Column({ type: 'varchar', length: 100, nullable: true })
    image: string;

    @Column({ name: 'is_selected', type: 'boolean', default: false, nullable: true })
    isSelected: boolean;        

    @Column({ name: 'is_valid', type: 'boolean', default: false, nullable: true })
    isValid: boolean;            

    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true,        
    })
    updatedAt: Date;

    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------   
    @ManyToOne(() => TestQuestionEntity, testQuestion => testQuestion.testAnswers, {
        nullable: false
    })
    @JoinColumn([{ name: "test_question_id", referencedColumnName: "id" }])
    testQuestion: TestQuestionEntity;
}
