FROM node:20-alpine as build
WORKDIR /app
COPY . .

RUN npm run build:dev
# RUN npm run build

# CMD ["npm", "run", "start:local"]
CMD ["npm", "run", "start:dev"]
# CMD ["npm", "run", "start"]