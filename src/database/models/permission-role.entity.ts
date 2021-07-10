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
    @ManyToOne(() => RoleEntity, role => role.permission_roles, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: "role_code", referencedColumnName: "code" }])
    role: RoleEntity

    @ManyToOne(() => PermissionEntity, permission => permission.permission_roles, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn([{ name: "permission_code", referencedColumnName: "code" }])
    permission: PermissionEntity;   
}
