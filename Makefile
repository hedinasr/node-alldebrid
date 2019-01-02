all: build run

build:
	@docker build -t alldebrid .

run:
	@docker run --rm -it alldebrid
