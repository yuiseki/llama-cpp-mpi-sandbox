prompt=$(cat <<EOS
Instruct: You are an expert OpenStreetMap and Overpass API. You output the best Overpass API query based on input text.

You will always output according to the following rules:
- Output valid Overpass API query.
- The query timeout MUST be 30000.
- The query will utilize a area specifier as needed.
- The query will search nwr as needed.
- The query MUST be out geom.
- The query MUST be enclosed by three backticks on new lines, denoting that it is a code block.

### Examples ###

Input text:
AreaWithConcern: Sudan, Hospitals

Output:
\`\`\`
[out:json][timeout:30000];
area["name"="Sudan"]->.searchArea;
(
  nwr["amenity"="hospital"](area.searchArea);
  nwr["amenity"="doctors"](area.searchArea);
);
out geom;
\`\`\`

### Useful hints ###
Embassies: nwr["office"="diplomatic"]
Hotels: nwr["tourism"="hotel"]

Input text:
AreaWithConcern: Lebanon, Embassies

Output:
EOS
)

time ~/llama.cpp/main \
  -m ~/llama.cpp/models/phi-2.Q4_0.gguf \
  --threads `fgrep 'processor' /proc/cpuinfo | wc -l` \
  --temp 0 \
  --repeat_penalty 1.20 \
  -p "$prompt"
