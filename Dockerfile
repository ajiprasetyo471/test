FROM node:18-alpine

RUN yarn global add serve

WORKDIR /app

COPY package.json /app

RUN --mount=type=cache,target=/app/.yarn \
  yarn config set cache-folder /app/.yarn && \
  yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000 
ENV PORT 3000

CMD ["serve", "-s", "dist"]
