FROM mcr.microsoft.com/playwright:v1.34.0-jammy

RUN apt-get update && \
	apt-get install -y curl git gnupg gpg lsb-release telnet unzip

# Bun
RUN curl -fsSL https://bun.sh/install | bash