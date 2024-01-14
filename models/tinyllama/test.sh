prompt=$(cat <<EOS
Instruct: What is the name of the Secretary General of the United Nations?
Output:
EOS
)

time ~/llama.cpp/main \
  -m ~/llama.cpp/models/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf \
  --threads `fgrep 'processor' /proc/cpuinfo | wc -l` \
  --temp 0 \
  --repeat_penalty 1.20 \
  -p "$prompt"
