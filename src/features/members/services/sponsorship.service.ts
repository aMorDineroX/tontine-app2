export class SponsorshipService {
  static async createSponsorshipRequest(data: {
    sponsorId: string;
    prospectiveUserId: string;
    tontineId: string;
    message: string;
  }) {
    // Vérifier l'éligibilité du parrain
    const sponsor = await prisma.tontineMember.findFirst({
      where: {
        userId: data.sponsorId,
        tontineId: data.tontineId,
        status: 'ACTIVE'
      }
    });

    if (!sponsor) {
      throw new Error('Sponsor must be an active member');
    }

    const request = await prisma.sponsorshipRequest.create({
      data: {
        ...data,
        status: 'PENDING'
      }
    });

    // Notifier les administrateurs
    await NotificationService.notifySponsorshipRequest(request.id);

    return request;
  }

  static async approveSponsorshipRequest(requestId: string) {
    const request = await prisma.sponsorshipRequest.update({
      where: { id: requestId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date()
      },
      include: {
        prospectiveUser: true,
        tontine: true
      }
    });

    // Créer le nouveau membre
    await prisma.tontineMember.create({
      data: {
        userId: request.prospectiveUserId,
        tontineId: request.tontineId,
        sponsorId: request.sponsorId,
        status: 'ACTIVE'
      }
    });

    return request;
  }

  static async getSponsorshipMetrics(sponsorId: string) {
    return await prisma.sponsorshipRequest.groupBy({
      by: ['status'],
      where: {
        sponsorId
      },
      _count: true
    });
  }
}