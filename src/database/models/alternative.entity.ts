import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity({ name: 'alternatives' })
export class AlternativeEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})    
    id: number;    

    @Column({ type: 'varchar', length: 100 })
    option: string;
   
    @Column({ type: 'varchar', length: 100, nullable: true })
    image: string;

    @Column({ name: 'is_valid', type: 'boolean', default: false })
    isValid: boolean;        

    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------
    @ManyToOne(() => QuestionEntity, question => question.alternatives, {
        nullable: false
    })
    @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
    question: QuestionEntity;
}
