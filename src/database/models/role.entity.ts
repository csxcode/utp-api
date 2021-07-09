import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PermissionRoleEntity } from './permission-role.entity';

@Entity({ name: 'roles' })
@Unique(['name'])
@Unique(['displayName'])
export class RoleEntity {
    @PrimaryGeneratedColumn({type: 'smallint'})         
    id: number;    

    @Column({ type: 'varchar', length: 50})
    name: string;   

    @Column({ name: 'display_name', type: 'varchar', length: 50})
    displayName: string;          

    @OneToMany(() => PermissionRoleEntity, permissionRole => permissionRole.role, {
        onDelete: 'CASCADE'
    })
    permissionRoles: PermissionRoleEntity[];
}

