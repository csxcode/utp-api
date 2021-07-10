import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { QuestionEntity } from './question.entity';
import { TestQuestionEntity } from './test-question.entity';
import { ThematicEntity } from './thematic.entity';

@Entity({ name: 'test_configs' })
@Unique(['code'])
export class TestConfigEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;    

    @Column({ type: 'varchar', length: 20 })
    code: string;

    @Column({ type: 'varchar', length: 15 })
    level: string;

    @Column({ type: 'smallint'})
    questions_number: number;     

    @Column({ type: 'boolean', default: false })
    is_active: boolean;   

    @Column({ type: "bigint", nullable: false })
    thematic_id: number;

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

    //---------------------
    // thematic
    //---------------------
    @ManyToOne(() => ThematicEntity, thematic => thematic.test_configs, {
        nullable: false,
        onDelete: 'CASCADE'
    })    
    @JoinColumn([{ name: "thematic_id", referencedColumnName: "id" }])
    thematic: ThematicEntity;

    //---------------------
    // question
    //---------------------
    @OneToMany(() => QuestionEntity, question => question.testConfig, {
        onDelete: 'CASCADE' 
    })
    questions: QuestionEntity[];

    //---------------------
    // test_question
    //---------------------
    @OneToMany(() => TestQuestionEntity, testQuestion => testQuestion.test_config)
    test_questions: TestQuestionEntity[];
}
