
docker run \
  -v ~/llama.cpp/models:/models \
  local/llama.cpp:full \
  --run -m /models/llama-2-7b.Q4_K_M.gguf -p "Building a website can be done in 10 simple steps:" -n 512
