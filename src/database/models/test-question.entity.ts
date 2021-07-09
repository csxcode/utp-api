import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AreaEntity } from './area.entity';
import { TestAnswerEntity } from './test-answer.entity';
import { TestEntity } from './test.entity';
import { ThematicEntity } from './thematic.entity';

@Entity({ name: 'test_questions' })
export class TestQuestionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;    

    @Column({ name: 'question_code', type: 'varchar', length: 20 })
    questionCode: string;

    @Column({ name: 'question_description', type: 'text' })
    questionDescription: string;
   
    @Column({ name: 'question_image', type: 'varchar', length: 100, nullable: true })
    questionImage: string;

    @Column({ name: 'question_level', type: 'varchar', length: 15 })
    questionLevel: string;

    @Column({ name: 'question_thematic_name', type: 'varchar', length: 100 })
    questionThematicName: string;

    @Column({ name: 'is_marked', type: 'boolean', nullable: true })
    isMarked: boolean;      
    
    @Column({ name: 'area_code', type: 'varchar', length: 5 })
    areaCode: string;
 
    @Column({ name: 'thematic_name', type: 'varchar', length: 100 })
    thematicName: string;

    @Column({
        name: 'question_start',
        type: 'timestamp',
        nullable: true,
    })
    questionStart: Date;

    @Column({
        name: 'question_end',
        type: 'timestamp',
        nullable: true,        
    })
    questionEnd: Date;

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
    @ManyToOne(() => TestEntity, test => test.testQuestions)
    @JoinColumn([{ name: "test_id", referencedColumnName: "id" }])
    test: TestEntity;

    @ManyToOne(() => AreaEntity, area => area.testQuestions)
    @JoinColumn([{ name: "area_id", referencedColumnName: "id" }])
    area: AreaEntity;

    @ManyToOne(() => ThematicEntity, thematic => thematic.testQuestions)
    @JoinColumn([{ name: "thematic_id", referencedColumnName: "id" }])
    thematic: ThematicEntity;

    @OneToMany(() => TestAnswerEntity, testAnswer => testAnswer.testQuestion, {
        onDelete: 'CASCADE'
    })
    testAnswers: TestAnswerEntity[];
}
