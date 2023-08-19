FROM --platform=linux/amd64 node:11.15
ENV TZ=Asia/Ho_Chi_Minh

WORKDIR /usr/src/app
COPY package*.json . 

RUN npm install 


COPY . . 
EXPOSE 5000  
# CMD npm start
CMD ["node","index.js"]