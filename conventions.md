# Conventions de Développement

## Structure des Features
- Un dossier par feature
- Components isolés
- Services dédiés
- Types spécifiques
- Tests unitaires
- Schemas de validation Zod

## Nommage
- Components: PascalCase
- Fichiers: kebab-case
- Variables: camelCase
- Types: PascalCase
- Schemas: camelCase suffixé par 'Schema'

## Organisation du Code
- Imports groupés
- Export nommés
- Pas de logique dans les components
- Services pour la logique métier
- Utils pour les fonctions communes
- Schemas pour la validation des données

## Validation des Données
- Utilisation de Zod pour tous les schemas
- Un fichier par domaine (auth.schema.ts, user.schema.ts, etc.)
- Export via index.ts
- Validation middleware centralisé

## Documentation
- JSDoc pour les functions
- README par feature
- Types bien définis
- Commentaires pertinents
- Documentation des schemas de validation
