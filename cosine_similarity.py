import sys
import numpy as np

embeddings_1_path = sys.argv[1]
embeddings_1_array = open(embeddings_1_path).readlines()[0].split(' ')[0:-1]

embeddings_2_path = sys.argv[2]
embeddings_2_array = open(embeddings_2_path).readlines()[0].split(' ')[0:-1]

embeddings_1 = np.array(embeddings_1_array, dtype=float)
embeddings_2 = np.array(embeddings_2_array, dtype=float)


def cos_sim(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))


distance = cos_sim(embeddings_1, embeddings_2)
print(distance)
