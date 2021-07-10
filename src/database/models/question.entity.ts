import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AlternativeEntity } from './alternative.entity';
import { TestConfigEntity } from './test-config.entity';

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

    @Column({ type: 'boolean', default: false })
    is_active: boolean;   

    @Column({ type: 'varchar', length: 15 })
    level: string;       

    @Column({ type: "bigint", nullable: false })
    test_config_id: number;


    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------
    
    //---------------------
    // test_config
    //---------------------
    @ManyToOne(() => TestConfigEntity, testConfig => testConfig.questions, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: "test_config_id", referencedColumnName: "id" }])
    testConfig: TestConfigEntity;

    //---------------------
    // alternatives
    //---------------------
    @OneToMany(() => AlternativeEntity, alternative => alternative.question, {
        onDelete: 'CASCADE'
    })
    alternatives: AlternativeEntity[];
}
