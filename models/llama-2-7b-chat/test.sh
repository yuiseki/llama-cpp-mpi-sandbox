prompt=$(cat <<EOS
[INST] <<SYS>>
You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.
<</SYS>>
Concise answer the following question: What is the name of the Secretary General of the United Nations?
[/INST]
EOS
)

time ~/llama.cpp/main \
  -m ~/llama.cpp/models/llama-2-7b-chat.Q4_K_M.gguf \
  --threads `fgrep 'processor' /proc/cpuinfo | wc -l` \
  --temp 0 \
  --repeat_penalty 1.20 \
  -p "$prompt"
