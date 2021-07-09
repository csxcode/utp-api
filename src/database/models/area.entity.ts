import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { TestQuestionEntity } from './test-question.entity';
import { ThematicEntity } from './thematic.entity';

@Entity({ name: 'areas' })
@Unique(['code'])
@Unique(['name'])
export class AreaEntity {
    @PrimaryGeneratedColumn({type: 'smallint'})      
    id: number;    

    @Column({ type: 'varchar', length: 5})
    code: string;   

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
    @OneToMany(() => ThematicEntity, thematic => thematic.area, {
        onDelete: 'CASCADE'
    })
    thematics: ThematicEntity[];

    @OneToMany(() => TestQuestionEntity, testQuestion => testQuestion.area)
    testQuestions: TestQuestionEntity[];
}

