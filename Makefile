

eslint:
	npm run eslint
dev:
	make run
run:
	npm run start
build:
	npm run build
production:
	make eslint
	make build