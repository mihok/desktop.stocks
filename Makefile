
NPM_CMD ?= npm
ZIP_CMD ?= tar
ZIP_OPTIONS ?= -zcf

APP_NAME ?= Application
COMPANY_NAME ?= Mihok Systems Inc.
LICENSE ?= BSD-3

PACKAGE = `pwd`
SRC = $(PACKAGE)/src
ASSETS = $(PACKAGE)/assets
DIST = $(PACKAGE)/dist

.PHONY: default
default: clean compile build test lint coverage package

run: clean compile build start

dependencies:
	$(NPM_CMD) install

lint:
	$(NPM_CMD) run lint

test: compile build
	$(NPM_CMD) test

coverage:
	$(NPM_CMD) run coverage

clean:
	rm -r $(DIST) | true #2>&1 >/dev/null #> /dev/null 2>&1
	mkdir -p $(DIST)

build:
	$(NPM_CMD) run build
	cd $(DIST); $(NPM_CMD) install --production

compile:
	$(NPM_CMD) run compile

start:
	$(NPM_CMD) start

package:
	exit 0;

# package-linux:
# 	@echo "\nLinux\n"
# 	
# 	$(NPM_CMD) run compile:linux -- \
# 	--ignore=README.md \
# 	--ignore=webpack.config.js \
# 	--ignore=Makefile \
# 	--ignore=yarn.lock \
# 	--ignore=package-log.json \
# 	--ignore=.gitignore \
# 	--ignore=src \
# 	--ignore=node_modules \
# 	--appname=$(APP_NAME) \
# 	--app-copyright=$(LICENSE)
# 
# package-win:
# 	@echo "\nWindows\n"
# 	$(NPM_CMD) run compile:win -- \
# 	--ignore=README.md \
# 	--ignore=webpack.config.js \
# 	--ignore=Makefile \
# 	--ignore=yarn.lock \
# 	--ignore=package-log.json \
# 	--ignore=.gitignore \
# 	--ignore=src \
# 	--ignore=node_modules \
# 	--win32metadata.CompanyName='$(COMPANY_NAME)' \
# 	--win32metadata.ProductName=$(APP_NAME) \
# 	--appname=$(APP_NAME) \
# 	--app-copyright=$(LICENSE)
# 
# package-osx:
# 	@echo "\nOSX\n"
# 	$(NPM_CMD) run compile:osx -- \
# 	--ignore=README.md \
# 	--ignore=webpack.config.js \
# 	--ignore=Makefile \
# 	--ignore=yarn.lock \
# 	--ignore=package-log.json \
# 	--ignore=.gitignore \
# 	--ignore=src \
# 	--ignore=node_modules \
# 	--appname=$(APP_NAME) \
# 	--app-copyright=$(LICENSE) 
# 
# compile: build compile-linux compile-win compile-osx
# 
# distribute:
# 	@echo
# 	@cd $(DIST); ls -d * | xargs -I [] $(ZIP_CMD) $(ZIP_OPTIONS) [].tar.gz []
# 

