import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
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

    @Column({ name: 'questions_number', type: 'smallint'})
    questionsNumber: number;   

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
    @ManyToOne(() => ThematicEntity, thematic => thematic.testConfigs, {
        nullable: false
    })    
    @JoinColumn([{ name: "thematic_id", referencedColumnName: "id" }])
    thematic: ThematicEntity;
}
