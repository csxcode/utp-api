import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AreaEntity } from './area.entity';
import { QuestionEntity } from './question.entity';
import { TestConfigEntity } from './test-config.entity';
import { TestQuestionEntity } from './test-question.entity';

@Entity({ name: 'thematics' })
export class ThematicEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})        
    id: number;        

    @Column({ type: 'varchar', length: 100})
    name: string;   

    @Column({ name: 'is_active', type: 'boolean', default: false })
    isActive: boolean;

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
    @ManyToOne(() => AreaEntity, area => area.thematics, {
        nullable: false
    })
    @JoinColumn([{ name: "area_id", referencedColumnName: "id" }])
    area: AreaEntity;

    @OneToMany(() => TestConfigEntity, testConfig => testConfig.thematic)
    testConfigs: TestConfigEntity[];

    @OneToMany(() => QuestionEntity, question => question.thematic)
    questions: QuestionEntity[];

    @OneToMany(() => TestQuestionEntity, testQuestion => testQuestion.thematic)
    testQuestions: TestQuestionEntity[];
}

