prompt=$(cat <<EOS
Question: What is the name of the Secretary General of the United Nations?
Concise answer: 
EOS
)

time ~/llama.cpp/main \
  -m ~/llama.cpp/models/llama-2-7b.Q4_K_M.gguf \
  --ctx-size 2048 \
  --n-predict 25 \
  --n-gpu-layers 50 \
  --threads 8 \
  --temp 0 \
  --repeat_penalty 1.20 \
  -p "$prompt"
