import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'permission_role' })
@Unique(['role', 'permission'])
export class PermissionRoleEntity {       
    @PrimaryGeneratedColumn('increment')
    id: number;   

    // ---------------------------------------------------
    // Relationships
    // ---------------------------------------------------
    @ManyToOne(() => RoleEntity, role => role.permissionRoles, {
        nullable: false
    })
    @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
    role: RoleEntity

    @ManyToOne(() => PermissionEntity, permission => permission.permissionRoles, {
        nullable: false
    })
    @JoinColumn([{ name: "permission_id", referencedColumnName: "id" }])
    permission: PermissionEntity;   
}
