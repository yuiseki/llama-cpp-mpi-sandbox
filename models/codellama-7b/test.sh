prompt=$(cat <<EOS
Write code to solve the following coding problem that obeys the constraints and passes the example test cases. Please wrap your code answer using \`\`\`:
Enumerating prime numbers in Python.
EOS
)

time ~/llama.cpp/main \
  -m ~/llama.cpp/models/codellama-7b.Q4_K_M.gguf \
  --threads 8 \
  --temp 0 \
  --repeat_penalty 1.20 \
  -p "$prompt"
