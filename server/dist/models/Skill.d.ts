import { Document } from 'mongoose';
export interface ISkill extends Document {
    name: string;
    icon: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    description?: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: any;
export default _default;
//# sourceMappingURL=Skill.d.ts.map