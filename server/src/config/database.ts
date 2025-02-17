import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'minimal',});
// Middleware for soft deletes
prisma.$use(async (params, next) => {  if (params.model && ['User', 'Tontine', 'TontineMember'].includes(params.model)) {
    if (params.action === 'delete') {      params.action = 'update';
      params.args['data'] = { deletedAt: new Date() };    }
    if (params.action === 'deleteMany') {      params.action = 'updateMany';
      if (params.args.data !== undefined) {        params.args.data['deletedAt'] = new Date();
      } else {        params.args['data'] = { deletedAt: new Date() };
      }    }
  }  return next(params);
});

export default prisma;












import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  errorFormat: 'minimal',
});

// Middleware for soft deletes
prisma.$use(async (params, next) => {
  if (params.model && ['User', 'Tontine', 'TontineMember'].includes(params.model)) {
    if (params.action === 'delete') {
      params.action = 'update';
      params.args['data'] = { deletedAt: new Date() };
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      if (params.args.data !== undefined) {
        params.args.data['deletedAt'] = new Date();
      } else {
        params.args['data'] = { deletedAt: new Date() };
      }
    }
  }
  return next(params);
});

export default prisma;
