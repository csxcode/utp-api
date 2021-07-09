import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PermissionEntity } from './permission.entity';

@Entity({ name: 'modules' })
@Unique(['name'])
export class ModuleEntity {
    @PrimaryGeneratedColumn({type: "smallint"})        
    id: number;    

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
