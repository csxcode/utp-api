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

    @Column({ type: 'boolean', default: false })
    is_active: boolean;

    @Column({ type: 'varchar', length: 100 })
    image: string;

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
    @OneToMany(() => ThematicEntity, thematic => thematic.area, {
        onDelete: 'CASCADE'
    })
    thematics: ThematicEntity[];

    @OneToMany(() => TestQuestionEntity, testQuestion => testQuestion.area)
    test_questions: TestQuestionEntity[];
}

