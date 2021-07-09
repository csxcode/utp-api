import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ModuleEntity } from './module.entity';
import { PermissionRoleEntity } from './permission-role.entity';

@Entity({ name: 'permissions' })
@Unique(['name'])
@Unique(['displayName'])
export class PermissionEntity {
    @PrimaryGeneratedColumn('increment')        
    id: number;    

    @Column({ type: 'varchar', length: 100})
    name: string;   

    @Column({ name: 'display_name', type: 'varchar', length: 100})
    displayName: string;   

    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------
    @ManyToOne(() => ModuleEntity, module => module.permissions, {
        nullable: false
    })
    @JoinColumn([{ name: "module_id", referencedColumnName: "id" }])
    module: ModuleEntity;

    @OneToMany(() => PermissionRoleEntity, permissionRole => permissionRole.permission, {
        onDelete: 'CASCADE'
    })
    permissionRoles: PermissionRoleEntity[];
}
