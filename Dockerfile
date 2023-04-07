FROM node:lts
WORKDIR /app
COPY . .
RUN npm install \
    && npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]