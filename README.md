# discord-gpt
 Discord GPT chatbot

## Build
```bash
# Build
docker build -t discord-gpt .

# Stop and delete container
docker stop hublaw-gpt && docker rm hublaw-gpt

# Run Container
docker run --name hublaw-gpt --restart=unless-stopped --env-file ./.env discord-gpt

```

## PM2 Stuff
```bash
# Monitoring CPU/Usage of each process
docker exec -it <container-id> pm2 monit
# Listing managed processes
docker exec -it <container-id> pm2 list
# Get more information about a process
docker exec -it <container-id> pm2 show
# 0sec downtime reload all applications
docker exec -it <container-id> pm2 reload all
```