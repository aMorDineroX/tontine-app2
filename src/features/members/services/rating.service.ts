export class RatingService {
  static async rateMember(data: {
    raterId: string;
    ratedMemberId: string;
    tontineId: string;
    score: number;
    comment?: string;
  }) {
    // Vérifier si l'évaluation est autorisée
    await this.validateRatingEligibility(data);

    const rating = await prisma.memberRating.create({
      data: {
        ...data,
        date: new Date()
      }
    });

    // Mettre à jour le score moyen du membre
    await this.updateMemberAverageRating(data.ratedMemberId);

    return rating;
  }

  static async updateMemberAverageRating(memberId: string) {
    const ratings = await prisma.memberRating.findMany({
      where: { ratedMemberId: memberId }
    });

    const averageScore = ratings.reduce((sum, rating) => sum + rating.score, 0) / ratings.length;

    await prisma.user.update({
      where: { id: memberId },
      data: {
        rating: averageScore
      }
    });

    return averageScore;
  }

  static async getMemberReputation(memberId: string) {
    return await prisma.user.findUnique({
      where: { id: memberId },
      select: {
        rating: true,
        ratings: {
          include: {
            rater: true
          }
        },
        sponsoredMembers: true,
        penalties: true
      }
    });
  }
}