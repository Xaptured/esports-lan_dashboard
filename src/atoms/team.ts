import { TeamType } from '@/schemas/team';
import { atom } from 'jotai';

export const teamAtom = atom<TeamType[] | undefined>(undefined);
