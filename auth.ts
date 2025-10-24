export const mockCredentials = {
  admin: { email: 'admin@colaboraedu.com', password: 'admin123' },
  professor: { email: 'professor@colaboraedu.com', password: 'prof123' },
  aluno: { email: 'aluno@colaboraedu.com', password: 'aluno123' },
  coordenador: { email: 'coordenador@colaboraedu.com', password: 'coord123' },
  secretario: { email: 'secretario@colaboraedu.com', password: 'sec123' },
  orientador: { email: 'orientador@colaboraedu.com', password: 'orient123' },
  bibliotecario: { email: 'bibliotecario@colaboraedu.com', password: 'biblio123' },
  responsavel: { email: 'responsavel@colaboraedu.com', password: 'resp123' },
};

type ProfileId = keyof typeof mockCredentials;

export const validateCredentials = (profileId: string, email: string, password: string): boolean => {
  const id = profileId as ProfileId;
  if (mockCredentials[id]) {
    return mockCredentials[id].email.toLowerCase() === email.toLowerCase() && mockCredentials[id].password === password;
  }
  return false;
};