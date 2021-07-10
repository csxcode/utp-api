import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ModuleEntity } from './module.entity';
import { PermissionRoleEntity } from './permission-role.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity {
    @PrimaryColumn({type: 'varchar', length: 50})      
    code: number;    

    @Column({ type: 'varchar', length: 100})
    name: string;        

    @Column({ type: "varchar", length: 20 })
    module_code: string;

    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------
    @ManyToOne(() => ModuleEntity, module => module.permissions, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: "module_code", referencedColumnName: "code" }])
    module: ModuleEntity;

    @OneToMany(() => PermissionRoleEntity, permissionRole => permissionRole.permission, {
        onDelete: 'CASCADE'
    })
    permission_roles: PermissionRoleEntity[];
}
