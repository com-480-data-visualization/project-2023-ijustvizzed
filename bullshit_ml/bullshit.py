import glob
import json
import re
import numpy as np
from gensim.models import Word2Vec
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import nltk
from nltk.corpus import stopwords
from gensim.models.callbacks import CallbackAny2Vec

THEORIES = list(map(lambda x: x.split(" "), """
chemtrails
illuminati
new world order
soros
jews
frogs
""".strip().split("\n")))

# antichrist
# islam
# furries
# nazi
# illuminati
# new world order
# alien
# twin towers
# frogs
# obama
# clinton
# stalin
# hitler

# Define the number of clusters for KMeans
NUM_CLUSTERS = 100



# Define the directory containing the documents
# DOCS_DIR = "./documents"
DOCS_DIR = "../infowars-main/"

# Download the list of stopwords from NLTK
nltk.download("stopwords")
# Get the list of stopwords
stop_words = set(stopwords.words("english"))


# Load the documents
docs = []
for filename in glob.glob(DOCS_DIR + "/*.txt")[:5000]:
    with open(filename, "r") as f:
        text = f.read()
        res = re.sub(r'[^\w\s]', '', text)
        res = res.replace('\n', ' ')
        res = res.lower()

        filtered_sentences = []
        words = res.split()
        filtered_words = [word for word in words if word.lower() not in stop_words]
        filtered_sentence = " ".join(filtered_words)

        docs.append(filtered_sentence)


# Tokenize the documents into sentences
sentences = [doc.split(" ") for doc in docs]

print(list(map(lambda x: len(x), sentences)))

# init callback class
class callback(CallbackAny2Vec):
    """
    Callback to print loss after each epoch
    """
    def __init__(self):
        self.epoch = 0

    def on_epoch_end(self, model):
        loss = model.get_latest_training_loss()
        if self.epoch == 0:
            print('Loss after epoch {}: {}'.format(self.epoch, loss))
        else:
            print('Loss after epoch {}: {}'.format(self.epoch, loss- self.loss_previous_step))
        self.epoch += 1
        self.loss_previous_step = loss

loss_logger = callback()


# Build the vocabulary of the Word2Vec model
model = Word2Vec(sentences, vector_size=100, min_count=5, compute_loss=True, epochs=10, callbacks=[loss_logger])
model.build_vocab(sentences)

# Train the Word2Vec model
model.train(sentences, total_examples=model.corpus_count, epochs=model.epochs)

matrix = []
for word in THEORIES:
    row = []
    for word2 in THEORIES:
        if word != word2:
            row += [max(int(1000*model.wv.n_similarity(word, word2)), 0)]
        else:
            row += [0]
    matrix += [row]

dataset = {"labels": THEORIES, "matrix": matrix}
print(matrix)
with open("../website/dataset.json", "w") as f:
    json.dump(dataset, f)

exit(1)



# Cluster the keywords
keywords = list(model.wv.key_to_index.keys())
vecs = model.wv[keywords]
kmeans = KMeans(n_clusters=NUM_CLUSTERS)
kmeans.fit(vecs)
centroids = kmeans.cluster_centers_
pca = PCA(n_components=2)
pca.fit(centroids)
reduced_centroids = pca.transform(centroids)

# Print the clusters
with open("clusters.csv", "w") as f:
    for i in range(NUM_CLUSTERS):
        print("Cluster ", i+1, ":")
        cluster_words = [keywords[j] for j in range(len(keywords)) if kmeans.labels_[j] == i]
        print(cluster_words)
        print("\n")
        f.write(",".join(reduced_centroids[i] + ","))
        f.write(",".join(cluster_words))
        f.write("\n")

