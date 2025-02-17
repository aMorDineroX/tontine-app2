export class DocumentService {
    static async uploadDocument({
      tontineId,
      uploaderId,
      type,
      file,
      metadata
    }: UploadDocumentDto) {
      // Validation du fichier
      await this.validateDocument(file);
  
      // Stockage sécurisé
      const storagePath = await this.storeDocument(file);
  
      const document = await prisma.document.create({
        data: {
          tontineId,
          uploaderId,
          type,
          path: storagePath,
          metadata,
          status: 'ACTIVE'
        }
      });
  
      // Indexation pour la recherche
      await this.indexDocument(document);
  
      return document;
    }
  
    static async getDocuments(tontineId: string, filters?: DocumentFilters) {
      return await prisma.document.findMany({
        where: {
          tontineId,
          ...filters
        },
        include: {
          uploader: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
    }
  
    static async archiveDocument(documentId: string) {
      return await prisma.document.update({
        where: { id: documentId },
        data: {
          status: 'ARCHIVED',
          archivedAt: new Date()
        }
      });
    }
  }
  