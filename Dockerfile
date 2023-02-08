FROM node:18.12.1

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y locales task-japanese fonts-ipafont
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:jp
ENV LC_ALL ja_JP.UTF-8
RUN fc-cache -fv

COPY package.json .
RUN npm install --quiet
COPY . .

# RUN npm ci
# RUN npm run build

# CMD ["npm","run","start"]