import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { LeadEntity } from './lead.entity';
import { TestEntity } from './test.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class UserEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})    
    id: Number;

    @Column({ type: 'varchar', length: 150 })
    email: string;

    @Column({ type: 'varchar', length: 250 })
    password: string;

    @Column({ type: 'timestamp', nullable: true })
    email_verified_at: Date;

    @Column({ type: 'boolean', default: false })
    is_active: boolean;

    @Column({ type: 'timestamp', nullable: true })
    last_login: Date;

    @Column({ type: 'text', nullable: true })
    active_jwt: string;

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
    @OneToOne(() => LeadEntity, lead => lead.user, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: "lead_id", referencedColumnName: "id" }])
    lead: LeadEntity;

    @OneToMany(() => TestEntity, test => test.user, {
        onDelete: 'CASCADE'
    })
    tests: TestEntity[];
}
