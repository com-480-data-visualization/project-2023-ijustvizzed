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

In order to prepare the textual data for further analysis, we trained a
Word2Vec model [@mikolov2013efficient; @mikolov2013distributed] on the
datasets.
This preprocessing step allows us to extract connections between conspiracy
theories in our visualization.

# Designing the Visualization

# Implementing the Visualization

An example for code blocks:

~~~{#lst:test .bash .numberLines caption="test"}
hello world
test
~~~

References work like this: [@Lst:test]

# Peer Assessment

# References
