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

    @Column({ name: 'mother_surname', type: 'varchar', length: 50 })
    motherSurname: string;

    @Column({ type: 'char', length: 1, nullable: true })
    gender: string;

    @Column({ type: 'varchar', length: 150 })
    email: string;

    @Column({ type: 'varchar', length: 10 })
    cellphone: string;

    @Column({
        name: 'document_number',
        type: 'varchar',
        length: 8,
        nullable: true,
    })
    documentNumber: string;

    @Column({
        name: 'birthdate',
        type: 'date',
    })
    birthdate: Date;

    @Column({ name: 'interest_career_id', type: 'varchar', length: 10 })
    interestCareerId: string;

    @Column({ name: 'interest_career_name', type: 'varchar', length: 100 })
    interestCareerName: string;

    @Column({ name: 'school_id', type: 'varchar', length: 20 })
    schoolId: string;

    @Column({ name: 'school_name', type: 'varchar', length: 100 })
    schoolName: string;

    @Column({ name: 'promoter_id', type: 'varchar', length: 20 })
    promoterId: string;

    @Column({ name: 'promoter_name', type: 'varchar', length: 100 })
    promoterName: string;

    @Column({ name: 'hs_code', type: 'varchar', length: 10 })
    hsCode: string;

    @Column({ name: 'hs_name', type: 'varchar', length: 50 })
    hsName: string;

    @Column({ name: 'hs_year_completed', type: 'year' })
    hsYearCompleted: Number;

    @Column({ name: 'source', type: 'varchar', length: 50 })
    source: string;

    @Column({ name: 'source_detail', type: 'varchar', length: 100 })
    sourceDetail: string;

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
    @OneToOne(() => UserEntity, user => user.lead)
    user: UserEntity;
}
