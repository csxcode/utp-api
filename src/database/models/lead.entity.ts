import {
    Column,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'leads' })
@Unique(['email'])
export class LeadEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})    
    id: Number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 50 })
    surname: string;

    @Column({ type: 'varchar', length: 50 })
    mother_surname: string;

    @Column({ type: 'char', length: 1, nullable: true })
    gender: string;

    @Column({ type: 'varchar', length: 150 })
    email: string;

    @Column({ type: 'varchar', length: 10 })
    cellphone: string;

    @Column({        
        type: 'varchar',
        length: 8,
        nullable: true,
    })
    document_number: string;

    @Column({        
        type: 'date',
    })
    birthdate: Date;

    @Column({ type: 'varchar', length: 10 })
    interest_career_id: string;

    @Column({ type: 'varchar', length: 100 })
    interest_career_name: string;

    @Column({ type: 'varchar', length: 20 })
    school_id: string;

    @Column({ type: 'varchar', length: 100 })
    school_name: string;

    @Column({ type: 'varchar', length: 20 })
    promoter_id: string;

    @Column({ type: 'varchar', length: 100 })
    promoter_name: string;

    @Column({ type: 'varchar', length: 10 })
    hs_code: string;

    @Column({ type: 'varchar', length: 50 })
    hs_name: string;

    @Column({ type: 'year', nullable: true })
    hs_year_completed: Number;

    @Column({ name: 'source', type: 'varchar', length: 50 })
    source: string;

    @Column({ type: 'varchar', length: 100 })
    source_detail: string;

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
    @OneToOne(() => UserEntity, user => user.lead, {
        onDelete: 'CASCADE'
    })
    user: UserEntity;
}
