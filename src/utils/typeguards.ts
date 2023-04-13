import { GithabUser } from 'types';

export const isGithabUser = (user: any): user is GithabUser => 'id' in user;
