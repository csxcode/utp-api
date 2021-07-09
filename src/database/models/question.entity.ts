import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AlternativeEntity } from './alternative.entity';
import { ThematicEntity } from './thematic.entity';

@Entity({ name: 'questions' })
@Unique(['code'])
export class QuestionEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;    

    @Column({ type: 'varchar', length: 20 })
    code: string;

    @Column({ name: 'description', type: 'text' })
    description: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    image: string;

    @Column({ name: 'is_active', type: 'boolean', default: false })
    isActive: boolean;   

    @Column({ name: 'level', type: 'varchar', length: 15 })
    level: string;       

    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------
    @ManyToOne(() => ThematicEntity, thematic => thematic.questions, {
        nullable: false
    })
    @JoinColumn([{ name: "thematic_id", referencedColumnName: "id" }])
    thematic: ThematicEntity;

    @OneToMany(() => AlternativeEntity, alternative => alternative.question, {
        onDelete: 'CASCADE'
    })
    alternatives: AlternativeEntity[];
}
