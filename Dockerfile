FROM node:20-slim

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
ENV NODE_ENV=production
# 1. Install dependencies normal
RUN npm install

# 2. [FIX UTAMA] Install TypeScript secara global secara PAKSA
# Ini menjamin perintah 'tsc' pasti ada, tidak peduli settingan production/dev
RUN npm install -g typescript

# 3. Generate Prisma
RUN npx prisma generate

COPY . .

# 4. Build (Sekarang tsc pasti ditemukan)
RUN npm run build

CMD [ "npm", "start" ]