prompt=$1
data='{"prompt": "'"${prompt}"'", "temperature": 0.0, "n_predict": 128, "stop": ["\n"]}'

curl -s --request POST \
    --url http://localhost:8080/completion \
    --header "Content-Type: application/json" \
    --data "$data" \
    | jq .content
