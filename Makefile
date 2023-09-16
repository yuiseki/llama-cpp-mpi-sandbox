
docker-build:
	docker build -t local/llama.cpp:full -f .devops/full.Dockerfile ~/llama.cpp
