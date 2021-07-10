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

    @Column({ type: 'boolean', default: false, nullable: true })
    is_selected: boolean;        

    @Column({ type: 'boolean', default: false, nullable: true })
    is_valid: boolean;            

    @Column({        
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;

    @Column({        
        type: 'timestamp',
        nullable: true,        
    })
    updated_at: Date;

    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------   
    @ManyToOne(() => TestQuestionEntity, testQuestion => testQuestion.test_answers, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: "test_question_id", referencedColumnName: "id" }])
    test_question: TestQuestionEntity;
}
