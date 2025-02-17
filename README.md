# Tontine App
Une application moderne de gestion de tontines, permettant aux communautés de gérer leurs épargnes rotatives de manière sécurisée et efficace.
## 🚀 Démo
Application déployée sur Railway : [Lien à venir]
## ✨ Fonctionnalités
- 👥 Authentification des utilisateurs
- 💰 Création et gestion des groupes de tontine- 📅 Planification des cotisations
- 💸 Système de paiement sécurisé- 📊 Tableau de bord analytique
- �� Interface responsive- 🔐 Sécurité renforcée
## 🛠 Stack Technique
### Frontend
- React + TypeScript- Vite
- TailwindCSS- React Router
- React Hook Form + Zod
### Backend- Node.js + Express
- PostgreSQL- Prisma ORM
- JWT Authentication- API RESTful
### DevOps
- Docker- Railway
- GitHub Actions- PostgreSQL
## 🚀 Installation
```bash
# Cloner le repositorygit clone https://github.com/aMorDineroX/tontine-app2.git
cd tontine-app2
# Installer les dépendancesnpm install
cd server && npm install
# Configurationcp .env.example .env
# Configurer les variables d'environnement
# Démarrer en développementnpm run start:all
```
## 🐳 Docker
```bash# Build et démarrage avec Docker Compose
docker-compose up --build```
## 📝 Structure du Projet
```
tontine-app/├── src/                  # Frontend
│   ├── components/      # Composants réutilisables│   ├── features/        # Fonctionnalités principales
│   ├── pages/          # Pages de l'application│   └── ...
├── server/              # Backend│   ├── src/
│   │   ├── controllers/│   │   ├── routes/
│   │   ├── services/│   │   └── ...
│   └── prisma/         # Configuration Prisma└── ...
```
## 🔐 Variables d'Environnement
```env# Frontend
VITE_API_URL=http://localhost:3003/api
# BackendPORT=3003
DATABASE_URL=postgresql://postgres:password123@localhost:5432/tontine_dbJWT_SECRET=votre_secret
```
## 🚀 Déploiement
L'application est configurée pour un déploiement automatique sur Railway via GitHub Actions.
### Prérequis- Compte Railway
- Variables d'environnement configurées sur Railway- Token Railway configuré dans les secrets GitHub
### Processus de déploiement
1. Push sur la branche main2. GitHub Actions déclenche le workflow de déploiement
3. Construction et déploiement automatique sur Railway
## 👥 Contribution
1. Fork le projet2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request
## 📄 License
MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.
## 📧 Contact
Votre Nom - [@votretwitter](https://twitter.com/votretwitter)

Lien du projet: [https://github.com/aMorDineroX/tontine-app2](https://github.com/aMorDineroX/tontine-app2)































































# Tontine App

Une application moderne de gestion de tontines, permettant aux communautés de gérer leurs épargnes rotatives de manière sécurisée et efficace.

## 🚀 Démo

Application déployée sur Railway : [Lien à venir]

## ✨ Fonctionnalités

- 👥 Authentification des utilisateurs
- 💰 Création et gestion des groupes de tontine
- 📅 Planification des cotisations
- 💸 Système de paiement sécurisé
- 📊 Tableau de bord analytique
- 📱 Interface responsive
- 🔐 Sécurité renforcée

## 🛠 Stack Technique

### Frontend
- React + TypeScript
- Vite
- TailwindCSS
- React Router
- React Hook Form + Zod

### Backend
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- API RESTful

### DevOps
- Docker
- Railway
- GitHub Actions
- PostgreSQL

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/aMorDineroX/tontine-app2.git
cd tontine-app2

# Installer les dépendances
npm install
cd server && npm install

# Configuration
cp .env.example .env
# Configurer les variables d'environnement

# Démarrer en développement
npm run start:all
```

## 🐳 Docker

```bash
# Build et démarrage avec Docker Compose
docker-compose up --build
```

## 📝 Structure du Projet

```
tontine-app/
├── src/                  # Frontend
│   ├── components/      # Composants réutilisables
│   ├── features/        # Fonctionnalités principales
│   ├── pages/          # Pages de l'application
│   └── ...
├── server/              # Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── ...
│   └── prisma/         # Configuration Prisma
└── ...
```

## 🔐 Variables d'Environnement

```env
# Frontend
VITE_API_URL=http://localhost:3003/api

# Backend
PORT=3003
DATABASE_URL=postgresql://postgres:password123@localhost:5432/tontine_db
JWT_SECRET=votre_secret
```

## 🚀 Déploiement

L'application est configurée pour un déploiement automatique sur Railway via GitHub Actions.

### Prérequis
- Compte Railway
- Variables d'environnement configurées sur Railway
- Token Railway configuré dans les secrets GitHub

### Processus de déploiement
1. Push sur la branche main
2. GitHub Actions déclenche le workflow de déploiement
3. Construction et déploiement automatique sur Railway

## 👥 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📧 Contact

Votre Nom - [@votretwitter](https://twitter.com/votretwitter)

Lien du projet: [https://github.com/aMorDineroX/tontine-app2](https://github.com/aMorDineroX/tontine-app2)
