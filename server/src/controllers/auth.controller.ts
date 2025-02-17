import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer l'utilisateur
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      res.status(201).json({ message: 'Utilisateur créé avec succès', userId: user.id });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      console.log('Login attempt:', { email }); // Log pour debug

      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Email et mot de passe requis',
          details: { email: !!email, password: !!password }
        });
      }

      // Trouver l'utilisateur
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Vérifier le mot de passe
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }

      // Créer le token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Retourner la réponse avec user et token
      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
  }

  async getCurrentUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: { id: true, email: true, name: true }
      });
      
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
    }
  }

  async logout(_req: Request, res: Response) {
    res.json({ message: 'Déconnexion réussie' });
  }

  async requestPasswordReset(req: Request, res: Response) {
    // Implémentation à venir
    res.status(501).json({ message: 'Non implémenté' });
  }

  async updatePassword(req: Request, res: Response) {
    // Implémentation à venir
    res.status(501).json({ message: 'Non implémenté' });
  }
}
