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

    @Column({ name: 'email_verified_at', type: 'timestamp', nullable: true })
    emailVerifiedAt: Date;

    @Column({ name: 'is_active', type: 'boolean', default: false })
    isActive: boolean;

    @Column({ name: 'last_login', type: 'timestamp', nullable: true })
    lastLogin: Date;

    @Column({ name: 'active_jwt', type: 'text', nullable: true })
    activeJWT: string;

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
