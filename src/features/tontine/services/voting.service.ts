export class VotingService {
  static async createPoll({
    tontineId,
    creatorId,
    title,
    description,
    options,
    endDate,
    type
  }: CreatePollDto) {
    const poll = await prisma.poll.create({
      data: {
        tontineId,
        creatorId,
        title,
        description,
        options: {
          create: options.map(option => ({
            text: option,
            voteCount: 0
          }))
        },
        endDate,
        type,
        status: 'ACTIVE'
      }
    });

    // Notifier tous les membres
    await NotificationService.notifyNewPoll(poll.id);
    
    return poll;
  }

  static async castVote(pollId: string, memberId: string, optionId: string) {
    // Vérifier si le membre a déjà voté
    const existingVote = await prisma.vote.findFirst({
      where: {
        pollId,
        memberId
      }
    });

    if (existingVote) {
      throw new Error('Member has already voted');
    }

    // Enregistrer le vote
    const vote = await prisma.vote.create({
      data: {
        pollId,
        memberId,
        optionId
      }
    });

    // Mettre à jour le compteur de votes
    await prisma.pollOption.update({
      where: { id: optionId },
      data: {
        voteCount: {
          increment: 1
        }
      }
    });

    return vote;
  }

  static async getPollResults(pollId: string) {
    return await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: {
          include: {
            votes: {
              include: {
                member: true
              }
            }
          }
        }
      }
    });
  }
}