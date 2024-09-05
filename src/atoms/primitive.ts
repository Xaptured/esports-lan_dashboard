import { atom } from 'jotai';

export const isDarkMode = atom<boolean>(true);
export const snackBarAtom = atom<boolean>(false);
export const snackBarMessageAtom = atom<string>('');
