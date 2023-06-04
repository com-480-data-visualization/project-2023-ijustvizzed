---
title: "The Power of Paranoia: Why Conspiracy Theories Persist"
author: 
    - Luca Di Bartolomeo
    - Florian Hofhammer
    - Philipp Mao
toc: true
toc-depth: 2
numbersections: true
listings: true
codeBlockCaptions: true
csl: ieee.csl
---

# Introduction

Conspiracy theories have for a long time alredy played an important role in the
history of mankind.
Oftentimes, xenophobic and religious motives played an important role in their
spread.
For example, the big outbreak of the plague in the 14th century caused serious
persecutions of Jews due to conspiracy theories that Jews poisoned wells in
order to extinguish the Christian population in Europe.

While a multitude of conspiracy theories kept getting invented throughout the
centuries, we focus on conspiracy theories with a significant spread since the
turn of the millenia.
More specifically, we focus on conspiracy theories playing an important role in
modern populist politics in the United States of America.

To this extent, we gather and analyze the dataset of Tweets of the former US
President Donald Trump as an important populist politician as well as the
transcriptions of the Infowars podcast published by Alex Jones, an US-American
right-wing populist political activist.

# Obtaining the Dataset

Due to Twitter's API access being severely restricted, we had to rely on
previous dumps of Trump's Tweets.
Luckily, the full set of Donald Trump's Tweets from 2009 until the suspension
of his account in early 2021 is readily available on GitHub
[@hershey2021complete].

The dataset of Trump Tweets has already been the basis of research publications
[@morales2021impact].
As such, we consider this dataset not novel enough to constitute the sole
source of data for our visualization.

Consequently, we obtained the full dataset of transcripts of Alex Jones'
Infowars podcast only recently published [@simonsen2023infowars].
This dataset has been created by transcribing the podcast episodes with
OpenAI's Whisper speech-to-text engine [@simonsen20234682].
The dataset consists of 187'748'262 words of text, adding up to 1.2 GB of
textual data.
To the best of our knowledge, we are the first project to conduct extensive
analysis on this dataset due to its recency.

During the implementation phase of our project, we found the Trump Tweet
dataset to be too sparse for meaningful analysis and comparisons with relation
to conspiracy theories.
As a result, we shifted the focus of our visualization from a comparison of
Alex Jones' and Donald Trump's views on conspiracy theories to a comparison
between Alex Jones' views reported in the Infowars podcast and news covered in
different US-American media outlets.

This latter dataset provides us with 2.7 million news articles from the years
2016-2020, amounting to roughly 8.8 GB of textual data [@thompson2022all].

In order to prepare the textual data for further analysis, we trained a
Word2Vec model [@mikolov2013efficient; @mikolov2013distributed] on the
datasets.
This preprocessing step allows us to extract connections between conspiracy
theories in our visualization.

A copy of our underlying dataset including the Word2Vec model we trained can be
obtained at <https://go.epfl.ch/com480-conspiracies>.

# Designing the Visualization

Our visualization focuses on how conspiracy theories evolve over time and how
the views of different sources on the theories differ.
For the former purpose, we highlight semantic connections between conspiracy
theories and their development over time.
Thus, a consumer of our visualization can for each conspiracy theory we focus
on deduce what other conspiracy theories developed in parallel and what causal
relationships between conspiracy theories may exist.

To achieve visualizing these relationships, a timeline which shows the
frequency of specific terms in our dataset per conspiracy theory is combined
with a chord chart highlighting the connections between theories.
The width of the chords in the graph determines the contextual closeness of two
conspiracy theories.
This contextual closeness implies a correlation: either the conspiracy theories
exhibit an overlap in affected topics and likely stem from the same motives
behind them (xenophobia, homophobia, antisemitism, etc.) or that one of them
developed into the other over time.
The type of this correlation can be determined by observing the development
over time of the theories in the aforementioned timeline.

Given that we cannot assume that every page visitor is familiar with the
conspiracy theories presented, hovering over a conspiracy theory also provides
the reader with contextual information.

In order to visualize how different sources (i.e., Alex Jones and different
classic US-American media outlets and news agencies report about conspiracy
theories, we once again leverage a timeline.
In this graph, a page visitor can select and deselect data sources for a given
conspiracy theory to plot the development over time across sources.
This provides the viewer with an insight into the temporal relationship of
references to a conspiracy theory across classic media outlets and Alex Jones'
Infowars podcast.

On the other hand, we refrain from providing a wordcloud with conspiracy
theories as we had originally intended.
During the implementation of our visualization, we encountered issues with the
sparsity of the wordcloud.
We consequently decided to remove the wordcloud from our final visualization
and focus on the timelines and chord charts instead.

# Implementing the Visualization

An example for code blocks:

~~~{#lst:test .bash .numberLines caption="test"}
hello world
test
~~~

References work like this: [@Lst:test]

# Peer Assessment

# References
