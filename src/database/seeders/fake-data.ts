import { UnitOfWorkService } from 'src/core/services/unit-of-work.service';
import * as _ from 'lodash';
import * as dayjs from 'dayjs'
import { UserEntity } from '../models/user.entity';

export class FakeDataSeed {
    constructor(private readonly uow: UnitOfWorkService) {}

    async run() {                    
        await this.createAreas();        
        await this.createThematics();  
        await this.createTestConfig();
        await this.createQuestionAndAlternatives();                
        await this.createLeads();        
    }

    async createAreas() {
        const areaData = [          
            { id: 1, code: 'M', name: 'Matemáticas', is_active: true, image: '' },
            { id: 2, code: 'CL', name: 'Comprensión lectora', is_active: true, image: '' },                                 
            { id: 3, code: 'SC', name: 'Science', is_active: true, image: '' },                          
            { id: 4, code: 'GK', name: 'General Knowledge ', is_active: true, image: '' },    
        ];        

        await this.uow.getManager().getRepository('areas').save(areaData);
        console.log('areas seeded');
    }

    async createThematics() {
        const thematicData = [          
            { id: 1, name: 'Computers & Programming', is_active: true, area_id: 3 },                                            
            { id: 2, name: 'Science & Nature', is_active: true, area_id: 3 },                                            

            { id: 3, name: 'History', is_active: true, area_id: 4 }, 
            { id: 4, name: 'Geography', is_active: true, area_id: 4 },             

            { id: 5, name: 'Operaciones con números reales', is_active: true, area_id: 1 },                                            
            { id: 6, name: 'Leyes y teoría de exponentes', is_active: true, area_id: 1 },  
            { id: 7, name: 'Razonamiento geométrico', is_active: true, area_id: 1 },  
            { id: 8, name: 'Términos algebraicos y polinomios', is_active: true, area_id: 1 },  
            { id: 9, name: 'Productos notables y división algebraica', is_active: true, area_id: 1 },  
            { id: 10, name: 'Factorización', is_active: true, area_id: 1 },  
            { id: 11, name: 'Ecuaciones', is_active: true, area_id: 1 },  

            { id: 12, name: 'Referentes', is_active: true, area_id: 2 },                                            
            { id: 13, name: 'Significado de una frase', is_active: true, area_id: 2 },  
            { id: 14, name: 'Interpretación de párrafos', is_active: true, area_id: 2 },  
            { id: 15, name: 'Ordenamiento de ideas', is_active: true, area_id: 2 },                          
        ];        

        await this.uow.getManager().getRepository('thematics').save(thematicData);
        console.log('thematics seeded');
    }

    async createTestConfig(){
        let testConfigData = [
            // Computers & Programming, ID: SC1
            { id: 1, code: `SC1B000`, level: 'BASIC', questions_number: 2, is_active: true, thematic_id: 1},
            { id: 2, code: `SC1I000`, level: 'INTERMEDIATE', questions_number: 2, is_active: true, thematic_id: 1 },
            { id: 3, code: `SC1E000`, level: 'EXPECTED', questions_number: 2, is_active: true, thematic_id: 1 },

            // Science & Nature, ID: SC2
            { id: 4, code: `SC2B000`, level: 'BASIC', questions_number: 2, is_active: true, thematic_id: 2 },
            { id: 5, code: `SC2I000`, level: 'INTERMEDIATE', questions_number: 2, is_active: true, thematic_id: 2 },
            { id: 6, code: `SC2E000`, level: 'EXPECTED', questions_number: 2, is_active: true, thematic_id: 2 },

            // History, ID: GK3
            { id: 7, code: `GK3B000`, level: 'BASIC', questions_number: 2, is_active: true, thematic_id: 3 },
            { id: 8, code: `GK3I000`, level: 'INTERMEDIATE', questions_number: 2, is_active: true, thematic_id: 3 },
            { id: 9, code: `GK3E000`, level: 'EXPECTED', questions_number: 2, is_active: true, thematic_id: 3 },

            // Geography, ID: GK4
            { id: 10, code: `GK4B000`, level: 'BASIC', questions_number: 2, is_active: true, thematic_id: 4 },
            { id: 11, code: `GK4I000`, level: 'INTERMEDIATE', questions_number: 2, is_active: true, thematic_id: 4 },
            { id: 12, code: `GK4E000`, level: 'EXPECTED', questions_number: 2, is_active: true, thematic_id: 4 },
        ];

        await this.uow.getManager().getRepository('test_configs').save(testConfigData);
        console.log('test_configs seeded');
    }
    
    async createQuestionAndAlternatives()
    {        
        // Computers & Programming, ID: SC1        
        await this.buildQuestionAndAlternativesFromJsonData(require('./data/q-science-computers.json').results, 'SC1', [1,2,3]);

         // Science & Nature, ID: SC2
        await this.buildQuestionAndAlternativesFromJsonData(require('./data/q-science-nature.json').results, 'SC2', [4,5,6]);

        // History, ID: GK3
        await this.buildQuestionAndAlternativesFromJsonData(require('./data/q-general-history.json').results, 'GK3', [7,8,9]);

        // Geography, ID: GK4
        await this.buildQuestionAndAlternativesFromJsonData(require('./data/q-general-geography.json').results, 'GK4', [10,11,12]);  
        
        console.log('questions seeded');
        console.log('alternatives seeded');
    }

    private async buildQuestionAndAlternativesFromJsonData(jsonData: any, codeThematicReference: string, testConfigIds: number[]) {

        // https://opentdb.com/api.php

        let jsonDataChunks = _.chunk(jsonData, Math.ceil(jsonData.length / 3));                
        let questionId: number = parseInt(await this.getLastQuestionId());        
        let questions = [];                                                   
        let alternatives = [];

        for (let levelIndex = 0; levelIndex <= 2; levelIndex++) {

            let numberIncrement = 0;            
            let testConfigId = testConfigIds[levelIndex];
            let level = null;

            if(levelIndex == 0){
                level = 'BASIC';
            } else if(levelIndex == 1){
                level = 'INTERMEDIATE';
            } else {
                level = 'EXPECTED';
            }
            
            jsonDataChunks[levelIndex].forEach((questionItemJson) => {                        
            
                // questions                
                questionId += 1;
                numberIncrement += 1;                
                let numberMasked = numberIncrement.toString().padStart(3, '0');
    
                questions.push({
                    id: questionId,
                    code: `${codeThematicReference}${level.charAt(0)}${numberMasked}`,
                    description: questionItemJson.question,
                    is_active: true,
                    level,
                    test_config_id: testConfigId
                });                
    
                // alternatives
                for (let alternateIndex = 0; alternateIndex < questionItemJson.incorrect_answers.length; alternateIndex++) {                    
                    const alternative = questionItemJson.incorrect_answers[alternateIndex];
                    alternatives.push({                        
                        option: alternative,
                        is_valid: false,
                        question_id: questionId,
                    });
    
                    // correct alternative
                    if (alternateIndex == questionItemJson.incorrect_answers.length - 1) {                        
                        alternatives.push({                            
                            option: questionItemJson.correct_answer,
                            is_valid: true,
                            question_id: questionId,
                        });
                    }
                }
            });                                       
        }       
        
        await this.uow.getManager().getRepository('questions').save(questions);
        await this.uow.getManager().getRepository('alternatives').save(alternatives);               
    }    

    async createLeads(){
        let birthDate = dayjs('1990-01-01');
        let leadData = {
            id: 1,
            name: 'Walter',
            surname: 'White',
            mother_surname: 'Heisenberg',
            gender: 'M',
            email: 'wwhite@test.com',
            cellphone: '123456789',
            document_number: '11223344',
            birthdate: birthDate.format('YYYY-MM-DD'),
            interest_career_id: 'A0001',
            interest_career_name: 'Software Engineer',
            school_id: 'SCH0001',
            school_name: 'Trilce Miraflores',
            promoter_id: 'PRO0001',
            promoter_name: 'Jesse Pinkman',
            hs_code: 'HS0001',
            hs_name: 'Secundaria Completa',
            hs_year_completed: new Date().getFullYear(),
            source: 'Prospección',
            source_detail: 'Examen Simulacro 001',
        };

        //await this.uow.getManager().getRepository('leads').save(leadData);
        console.log('leads seeded');

        let userData = {
            email: leadData.email,
            password: birthDate.format('DDMMYYYY'),
            is_active: true,
            lead_id: leadData.id
        };

        let user = await this.uow.getManager().getRepository('users').create(userData);                                
        await this.uow.getManager().getRepository('users').save(user);
        
        console.log('users seeded');
    }

    private async getLastQuestionId()
    {
        return await this.uow.getManager().getRepository('questions').find({
            order: {
               id: 'DESC'
            },
            take: 1
        }).then((question: any) => {            
            return question.length == 0 ? 0 : question[0].id 
        });
    }    
}
