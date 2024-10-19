FROM node:20.12.0-alpine3.19

WORKDIR /app

COPY package* .
COPY ./prisma .

COPY . .

# Install dependencies
RUN npm install
# Can you add a script to the global package.json that does this?
RUN npm run prisma:generate


CMD ["npm", "run", "start"]