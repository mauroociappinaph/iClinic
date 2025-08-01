# Tecnologías recomendadas para Mini CRM iClinic

---

## Backend
- Node.js con NestJS
- Base de datos:
  - MongoDB
- ORM:
  - Prisma
- Autenticación / Autorización:
  - JWT con Passport.js

---

## Frontend
- React con Next.js
  - Para una SPA rápida y SEO-friendly si necesitás páginas públicas o landing.
- Tailwind CSS para estilos rápidos, responsivos y modernos.
- React Query o SWR para manejo eficiente de datos remotos y cache.
- Zustand para estados globales

---

## DevOps / Infraestructura
- Docker para contenerización y facilitar despliegue local y en producción.
- Vercel o Netlify para frontend (Next.js), y Heroku, Render, Railway o DigitalOcean para backend y base de datos.

---

## Otros
- Control de versiones: Git + GitHub/GitLab/Bitbucket.
- Documentación API: Swagger (NestJS lo incluye muy fácil).

---

## Arquitectura
- DRY y SPA
- Barrel
