FROM node:18-alpine

RUN npm install -g serve

WORKDIR /app

COPY package.json /app

# RUN --mount=type=cache,target=/app/.yarn \
#   yarn config set cache-folder /app/.yarn && \
#   yarn install --frozen-lockfile

# RUN --mount=type=cache,target=/app/.npm \
#   npm ci --cache /app/.npm

RUN --mount=type=cache,target=/app/.npm \
  npm config set cache /app/.npm && \
  npm ci

COPY . .

RUN npm run build

EXPOSE 3000 
ENV PORT 3000

CMD ["serve", "-s", "dist"]
