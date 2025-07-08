import mongoose, { Document } from 'mongoose';
export interface ISkillCategory extends Document {
    name: string;
    description?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<ISkillCategory, {}, {}, {}, mongoose.Document<unknown, {}, ISkillCategory, {}> & ISkillCategory & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=SkillCategory.d.ts.map