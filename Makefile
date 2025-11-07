MAKEFLAGS += --no-print-directory
SHELL := /bin/bash

build:
	@docker compose build

check: \
	format-code \
	lint-code \

clean: \
	clean-dependencies \
	clean-docker

clean-dependencies:
	@rm -rf .next
	@rm -rf .pnpm-store
	@rm -rf node_modules

clean-docker:
	@docker container rm -f hackathon-app >/dev/null 2>&1 || true
	@docker image rm -f hackathon-app-local >/dev/null 2>&1 || true
	@docker volume rm -f hackathon-app-local-next >/dev/null 2>&1 || true
	@docker volume rm -f hackathon-app-local-node-modules >/dev/null 2>&1 || true

exec-command:
	@docker exec -t hackathon-app $(CMD)

exec-command-it:
	@docker exec -it hackathon-app $(CMD)

format-code:
	@((pnpm list prettier --depth=0 | grep -q 'prettier' || pnpm add -D prettier >/dev/null 2>&1) \
	  && pnpm run format >/dev/null 2>&1 \
	  && (printf "pnpm run format"; for i in $$(seq 1 58); do printf "."; done; printf "\033[30;42mPassed\033[0m\n") \
	  || (printf "pnpm run format"; for i in $$(seq 1 58); do printf "."; done; printf "\033[37;41mFailed\033[0m\n" && pnpm run format))

lint-code:
	@((pnpm list eslint --depth=0 | grep -q 'eslint' || pnpm add -D eslint >/dev/null 2>&1) \
	  && pnpm run lint >/dev/null 2>&1 \
	  && (printf "pnpm run lint"; for i in $$(seq 1 60); do printf "."; done; printf "\033[30;42mPassed\033[0m\n") \
	  || (printf "pnpm run lint"; for i in $$(seq 1 60); do printf "."; done; printf "\033[37;41mFailed\033[0m\n" && pnpm run lint))

pre-commit:
	@pre-commit run -a

prune:
	@docker builder prune --filter 'until=72h' -a -f
	@docker image prune --filter 'until=72h' -a -f
	@docker volume prune -f

run:
	@COMPOSE_BAKE=true DOCKER_BUILDKIT=1 \
	docker compose -f docker-compose/local.yaml --project-name hackathon-app-local build && \
	docker compose -f docker-compose/local.yaml --project-name hackathon-app-local up --remove-orphans

shell:
	@CMD="/bin/sh" $(MAKE) exec-command-it

update: \
	clean-dependencies \
	update-dependencies \
	update-pre-commit

update-dependencies:
	pnpm update

update-pre-commit:
	@pre-commit autoupdate
