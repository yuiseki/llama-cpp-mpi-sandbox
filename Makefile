all: docker-build docker-compose-up

docker-build:
	docker image inspect local/llama.cpp:full > /dev/null || docker build -t local/llama.cpp:full -f ~/llama.cpp/.devops/full.Dockerfile ~/llama.cpp
	docker image inspect local/llama.cpp:full-cuda > /dev/null || docker build -t local/llama.cpp:full-cuda -f ~/llama.cpp/.devops/full-cuda.Dockerfile ~/llama.cpp

docker-compose-up:
	docker compose up
