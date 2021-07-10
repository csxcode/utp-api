import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity({ name: 'alternatives' })
export class AlternativeEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})    
    id: number;    

    @Column({ type: "bigint", nullable: false })
    question_id: number;

    @Column({ type: 'varchar', length: 100 })
    option: string;
   
    @Column({ type: 'varchar', length: 100, nullable: true })
    image: string;

    @Column({ type: 'boolean', default: false })
    is_valid: boolean;        

    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------
    
    //---------------------
    // question
    //---------------------
    @ManyToOne(() => QuestionEntity, question => question.alternatives, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
    question: QuestionEntity;
}
