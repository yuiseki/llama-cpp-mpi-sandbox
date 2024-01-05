prompt=$(cat <<EOS
Question: What is the name of the Secretary General of the United Nations?
EOS
)
prompt_json_escape=$(echo "${prompt}" | jq -R -s @json)
echo "${prompt_json_escape}"

curl -s --request POST \
    --url http://localhost:8080/completion \
    --header "Content-Type: application/json" \
    --data '{"prompt": '"${prompt_json_escape}"', "n_predict": 64, "temperature": 0.0}' \
    | jq .
