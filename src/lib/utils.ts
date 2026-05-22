import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Dados centralizados do site — edite aqui para trocar conteúdo/contato. */
export const SITE = {
  brand: 'Infinity Sistemas',
  cnpj: '53.474.397/0001-10',
  whatsapp: '5500000000000', // TODO: número real (formato 55DDDNUMERO)
  whatsappLabel: '(00) 00000-0000',
  email: 'contato@infinitysistemas.com.br', // TODO: e-mail real
  city: 'Salvador, BA', // TODO
  instagram: 'https://instagram.com/', // TODO
  linkedin: 'https://linkedin.com/', // TODO
  portalUrl: 'https://assinaturas.infinitysistemas.com.br',
};
