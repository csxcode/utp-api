import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PermissionRoleEntity } from './permission-role.entity';

@Entity({ name: 'roles' })
@Unique(['name'])
export class RoleEntity {
    @PrimaryColumn({type: 'varchar', length: 50})        
    code: string;    

    @Column({ type: 'varchar', length: 50})
    name: string;      

    @OneToMany(() => PermissionRoleEntity, permissionRole => permissionRole.role, {
        onDelete: 'CASCADE'
    })
    permission_roles: PermissionRoleEntity[];
}

