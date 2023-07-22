import { categories } from '../models/categories'
export interface TopicLogo {
    topic: categories;
    url: string;
}
const topicLogo_Acceuil: TopicLogo = {
    topic: 'Acceuil',
    url:'',
};
const topicLogo_FAQ: TopicLogo = {
topic: 'FAQ',
 url: 'faq',
};

export const allTopicLogos: TopicLogo[] = [topicLogo_Acceuil, topicLogo_FAQ];


