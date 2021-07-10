import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity({ name: 'settings' })
@Unique(['code'])
export class SettingEntity {
    @PrimaryColumn({ type: 'varchar', length: 50})    
    code: string;    

    @Column({ type: 'text'})
    value: string;

    @Column({        
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;
}
