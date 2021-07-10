import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AreaEntity } from './area.entity';
import { TestConfigEntity } from './test-config.entity';

@Entity({ name: 'thematics' })
export class ThematicEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})        
    id: number;        

    @Column({ type: 'varchar', length: 100})
    name: string;   

    @Column({ type: 'boolean', default: false })
    is_active: boolean;

    @Column({ type: "smallint" })
    area_id: number;

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
    
    //---------------------
    // area
    //---------------------
    @ManyToOne(() => AreaEntity, area => area.thematics, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: "area_id", referencedColumnName: "id" }])
    area: AreaEntity;

    //---------------------
    // test_config
    //---------------------
    @OneToMany(() => TestConfigEntity, testConfig => testConfig.thematic, {
        onDelete: 'CASCADE'
    })
    test_configs: TestConfigEntity[];      
}

