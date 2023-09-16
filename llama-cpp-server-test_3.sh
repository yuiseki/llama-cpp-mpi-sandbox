
data='{ "prompt": "Hello in Japanese is ", "temperature": 0.0 }'


curl -s --request POST \
    --url http://localhost:8080/completion \
    --header "Content-Type: application/json" \
    --data "$data" \
    | jq .content
