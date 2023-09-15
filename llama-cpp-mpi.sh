prompt=$(cat <<EOS
Question: What is the name of the Secretary General of the United Nations?
Concise answer: 
EOS
)

mpirun -v --mca orte_base_help_aggregate 0 -hostfile ./hostfile -np 4 ~/llama.cpp/main \
  -m ~/llama.cpp/models/llama-2-7b.Q4_K_M.gguf \
  --n-predict 25 \
  --threads 2 \
  --temp 0 \
  --repeat_penalty 1.20 \
  -p "$prompt"
