FROM mcr.microsoft.com/playwright:v1.34.0-jammy

RUN apt-get update && \
	apt-get install -y curl git gnupg gpg lsb-release telnet unzip

# Bun
RUN curl -fsSL https://bun.sh/install | bash

# PNPM (for `pnpm -r`): https://github.com/oven-sh/bun/issues/5350
RUN curl -fsSL https://get.pnpm.io/install.sh | bash