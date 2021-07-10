import { UnitOfWorkService } from 'src/core/services/unit-of-work.service';

export class InitDataSeed {
    constructor(private readonly uow: UnitOfWorkService) {}

    async run() {        
        await this.createSettings();
        await this.createRoles();
        await this.createModules();
        await this.createPermissions();                    
    }

    async createSettings() {
        const settingData = [
            {
                code: 'TEST_MINUTES',
                value: 15,
                updated_at: `${new Date()}`,
            },
            {
                code: 'SOURCE',
                value: 'Prospección',
                updated_at: `${new Date()}`,
            },
            {
                code: 'SOURCE_DETAIL',
                value: 'Examen Simulacro 001',
                updated_at: `${new Date()}`,
            },
            {
                code: 'PRIVACY_POLICY_URL',
                value: 'https://utp.edu.pe/policitas-privacidad',
                updated_at: `${new Date()}`,
            },
            {
                code: 'TEST_ENABLED',
                value: true,
                updated_at: `${new Date()}`,
            },
        ];

        await this.uow.getManager().getRepository('settings').save(settingData);
        console.log('settings seeded');
    }

    async createRoles() {
        const roleData = [
            {
                code: 'ROLE_1',
                name: 'Rol de Gestor Académico',
            },
            {
                code: 'ROLE_2',
                name: 'Rol de Gestor de Admisión',
            },
            {
                code: 'ADMIN',
                name: 'Rol de Adinistrador',
            },
        ];

        await this.uow.getManager().getRepository('roles').save(roleData);
        console.log('roles seeded');
    }

    async createModules() {
        const moduleData = [            
            { code: 'AREA', name: 'Areas' },
            { code: 'QUESTION', name: 'Preguntas' },
            { code: 'SETTING', name: 'Configuraciones' },
            { code: 'TEST_CONFIG', name: 'Configuración de la prueba' },
            { code: 'THEMATIC', name: 'Referentes Tematicos' },            
        ];

        await this.uow.getManager().getRepository('modules').save(moduleData);
        console.log('modules seeded');
    }

    async createPermissions() {
        const PermissionData = [          
            { code: 'AREA_CREATE', name: 'Crear', module_code: 'AREA' },
            { code: 'AREA_EDIT', name: 'Editar', module_code: 'AREA' },
            { code: 'AREA_VIEW', name: 'Ver', module_code: 'AREA' },

            { code: 'QUESTION_CREATE', name: 'Crear', module_code: 'QUESTION' },
            { code: 'QUESTION_EDIT', name: 'Editar', module_code: 'QUESTION' },
            { code: 'QUESTION_VIEW', name: 'Ver', module_code: 'QUESTION' },

            { code: 'SETTING_CREATE', name: 'Crear', module_code: 'SETTING' },
            { code: 'SETTING_EDIT', name: 'Editar', module_code: 'SETTING' },
            { code: 'SETTING_VIEW', name: 'Ver', module_code: 'SETTING' },

            { code: 'TEST_CONFIG_CREATE', name: 'Crear', module_code: 'TEST_CONFIG' },
            { code: 'TEST_CONFIG_EDIT', name: 'Editar', module_code: 'TEST_CONFIG' },
            { code: 'TEST_CONFIG_VIEW', name: 'Ver', module_code: 'TEST_CONFIG' },    
            
            { code: 'THEMATIC_CREATE', name: 'Crear', module_code: 'THEMATIC' },
            { code: 'THEMATIC_EDIT', name: 'Editar', module_code: 'THEMATIC' },
            { code: 'THEMATIC_VIEW', name: 'Ver', module_code: 'THEMATIC' },                        
        ];        

        await this.uow.getManager().getRepository('permissions').save(PermissionData);
        console.log('permissions seeded');
    }
}
