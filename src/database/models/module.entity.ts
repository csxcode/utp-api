import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { PermissionEntity } from './permission.entity';

@Entity({ name: 'modules' })
@Unique(['name'])
export class ModuleEntity {
    @PrimaryColumn({type: 'varchar', length: 20})        
    code: string;    

    @Column({ type: 'varchar', length: 50})
    name: string;   

    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------    
    @OneToMany(() => PermissionEntity, permission => permission.module, {
        onDelete: 'CASCADE'
    })
    permissions: PermissionEntity[];
}
