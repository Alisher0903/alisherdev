import { Document } from 'mongoose';
export interface IProject extends Document {
    name: string;
    favicon: string;
    imageUrl: string[];
    description: string;
    sourceCodeHref: string;
    liveWebsiteHref?: string;
    technologies: string[];
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: any;
export default _default;
//# sourceMappingURL=Project.d.ts.map