import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AreaEntity } from './area.entity';
import { TestAnswerEntity } from './test-answer.entity';
import { TestConfigEntity } from './test-config.entity';
import { TestEntity } from './test.entity';
import { ThematicEntity } from './thematic.entity';

@Entity({ name: 'test_questions' })
export class TestQuestionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;    

    @Column({ type: "bigint" })
    test_id: number;

    @Column({ type: "bigint", nullable: true })
    test_config_id: number;

    @Column({ type: 'varchar', length: 20 })
    test_config_code: string;

    @Column({ type: 'varchar', length: 20 })
    question_code: string;

    @Column({ type: 'text' })
    question_description: string;
   
    @Column({ type: 'varchar', length: 100, nullable: true })
    question_image: string;

    @Column({ type: 'varchar', length: 15 })
    question_level: string;   

    @Column({ type: 'boolean', nullable: true })
    is_marked: boolean;      
    
    @Column({ type: "smallint" })
    area_id: number;

    @Column({ type: 'varchar', length: 5 })
    area_code: string;
 
    @Column({ type: 'varchar', length: 100 })
    thematic_name: string;

    @Column({        
        type: 'timestamp',
        nullable: true,
    })
    question_start: Date;

    @Column({        
        type: 'timestamp',
        nullable: true,        
    })
    question_end: Date;

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
    @ManyToOne(() => TestEntity, test => test.test_questions)
    @JoinColumn([{ name: "test_id", referencedColumnName: "id" }])
    test: TestEntity;


    @ManyToOne(() => AreaEntity, area => area.test_questions)
    @JoinColumn([{ name: "area_id", referencedColumnName: "id" }])
    area: AreaEntity;


    @ManyToOne(() => TestConfigEntity, testConfig => testConfig.test_questions)
    @JoinColumn([{ name: "test_config_id", referencedColumnName: "id" }])
    test_config: TestConfigEntity;


    @OneToMany(() => TestAnswerEntity, testAnswer => testAnswer.test_question, {
        onDelete: 'CASCADE'
    })
    test_answers: TestAnswerEntity[];
}
