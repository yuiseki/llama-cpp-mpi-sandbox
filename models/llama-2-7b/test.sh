prompt=$(cat <<EOS
Concise answer the following question: What is the name of the Secretary General of the United Nations?
Answer: 
EOS
)

time ~/llama.cpp/main \
  -m ~/llama.cpp/models/llama-2-7b.Q4_K_M.gguf \
  --threads `fgrep 'processor' /proc/cpuinfo | wc -l` \
  --temp 0 \
  --repeat_penalty 1.20 \
  -p "$prompt"
