install:
	npm install

start:
	npx babel-node src/bin/gendiff.js

publish:
	npm publish

publish-test:
	npx eslint .
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest

test-dev:
	npx jest --watchAll
