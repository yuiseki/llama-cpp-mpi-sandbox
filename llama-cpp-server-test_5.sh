prompt=$1
data='{"content": "'"${prompt}"'"}'

curl -s --request POST \
    --url http://localhost:8080/embedding \
    --header "Content-Type: application/json" \
    --data "$data" \
    | jq .embedding