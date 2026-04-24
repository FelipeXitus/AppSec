import { type Paciente } from './pacienteEntity.js'
import { type Endereco } from '../enderecos/enderecoEntity.js'

export function sanitizacaoPaciente(paciente: Partial<Paciente>): Partial<Paciente> {
    const attributeSanitizations = {
      cpf: (value: string) => value.toString().replace(/[^0-9]/g, ''),
      nome: (value: string) => value.replace(/[^a-zA-Z-à-ú\s'-]/g, ''),
      email: (value: string) => value.trim(),
      telefone: (value: string) => value.replace(/[^0-9]/g, ''),
      endereco: {
            cep: (value: number) => value.toString().replace(/[^0-9]/g, ''),
            rua: (value: string) => value.replace(/[^a-zA-ZÀ-ú\s]/g, ''),
            estado: (value: string) => value.trim(),
            complemento: (value: string) => value.replace(/[^a-zA-ZÀ-ú\s]/g, ''),
            numero: (value: number) => parseInt(value.toString(), 10),
      },
    };
 
     const pacienteSanitizado: Partial<Paciente> = {};
  
     for (const key in paciente) {
           if (paciente.hasOwnProperty(key)) {
                 const value = paciente[key as keyof Paciente];
                 const sanizationRule = attributeSanitizations[key as keyof typeof attributeSanitizations];
  
                 if (sanizationRule) {
                       if (typeof sanizationRule === 'object') {
                             (pacienteSanitizado as Record<string, unknown>)[key] = {};
  
                             for (const subKey in sanizationRule) {
                                   if ((value as Endereco).hasOwnProperty(subKey)) {
                                     (pacienteSanitizado as Record<string, Record<string, unknown>>)[key][subKey] =
                                       (sanizationRule as Record<string, (v: unknown) => unknown>)[subKey](
                                         (value as Record<string, unknown>)[subKey]
                                       );
                                   }
                             }
                       } else {
                             (pacienteSanitizado as Record<string, unknown>)[key] = (sanizationRule as (v: unknown) => unknown)(value);
                       }
                 } else {
                       (pacienteSanitizado as Record<string, unknown>)[key] = value;
                 }
           }
     }
  
     return pacienteSanitizado;
   }
