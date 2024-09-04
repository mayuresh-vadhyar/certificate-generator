FROM node:14.15.2-alpine
WORKDIR /app/certificate-generator
COPY package.json ./
RUN apk add chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN npm install
RUN npm install puppeteer@1.20.0
COPY . .
EXPOSE 3000
CMD node index.js
