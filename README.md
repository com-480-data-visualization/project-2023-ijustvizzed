# Project of Data Visualization (COM-480)

| Student's name     | SCIPER |
| ------------------ | ------ |
| Philipp Mao        | 354420 |
| Florian Hofhammer  | 339295 |
| Luca Di Bartolomeo | 298831 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Setup

### Development Setup

For development purposes, hosting the website with a webserver and visiting
the page locally is sufficient, e.g., by using the provided [Dockerfile](./Dockerfile).
Our preprocessing scripts require certain prerequisites that can be installed
with `pip` via the corresponding [requirements file](./bullshit_ml/requirements.txt).

### Deployment

Our visualization is automatically deployed to GitHub pages via the GitHub Actions
CI.
The up-to-date version of our visualization can consequently always be found at
<https://com-480-data-visualization.github.io/project-2023-ijustvizzed/>.

## Milestone 1

Due: 23rd April, 5pm  
**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

The goal of our project is to understand the connection between former US president Trump's tweets and conspiracy theorists. Our dataset contains all of Trump's tweets from 2009 to 2021 as well as the transcribed content of 4686 episodes of the Alex Jones show. We believe that this later dataset is a good representation of conspiracy theories.

The dataset containing Alex Jones’ transcriptions is a gzipped 1.2 GB large csv file.
The dataset containing Trump Tweets consists of a 12MB csv file containing over 50k tweets. Given the shutdown of the free Twitter API, we need to rely on such existing restricted datasets for Tweets instead of retrieving more detailed information from the API.

### Problematic

Donald Trump, the former President of the United States, has been known to use conspiracy theories to support his position on various issues.

To gain a better understanding of how Trump's tweets are influenced by real-life events and conspiracy theories, we will create a website that visualizes his tweeting behavior. By analyzing Trump's tweets in the context of significant events and conspiracy theories, we aim to identify patterns and determine the extent to which these factors influence his social media activity.

Moreover, the project also aims to explore how Trump's tweets can impact real-world events and conspiracy theories. Given Trump's significant social media following, his tweets have the potential to spread quickly and influence public discourse, making it important to understand the relationship between his tweets and the broader socio-political landscape.

As a case study, we aim to link Trump’s tweeting behavior to the Alex Jones’ show, demonstrating how the former influences the latter and vice versa.

We aim to create an extensive set of (interactive) graphs on the topic.These include but are not restricted to: 

* Clustering of Tweets/show episodes by conspiracy theories mentioned in Trump’s Tweets and Alex Jones’ show
* Visualizing the overlap of conspiracy theories mentioned in Trump’s Tweets and Jones’ show
    * Overall visualization
    * Historical visualization: how does the overlap evolve over time
    * Visualization of correlation between Trump and Jones: when do Trump’s Tweets mention conspiracy theories that have been mentioned in Alex Jones’ show shortly before and vice versa
* Visualizing “density” of conspiracy theories:
    * How many distinctive conspiracy theories have been referred to by Jones/Trump in one unit of time (TBD, could be for example 1 week)
    * How often have Trump/Jones referred to a certain conspiracy theory in one unit of time (TBD, could be for example 1 week)


### Exploratory Data Analysis

The following graph shows the number of tweets by Trump per year. Interestingly there is a dip in the middle of his presidency. Which implies that for Trump Twitter becomes increasingly valuable before/during elections.

![Trump Tweets Years](img/trump_tweets_years.png)

The following wordcloud shows the most used words used in tweets by Trump:

![Trump Tweets](img/trump_tweets.png)

The following wordcloud shows the most used words by Alex Jones:

![Infowars](img/infowars.png)

Preliminary inspection of the wordclouds shows that further processing is required to make the data usable and extract the data relevant to conspiracy theories. Additionally the data will also need to be analyzed over time and correlated to each other along this axis.

### Related work

There are a number of projects that are dedicated to analyzing Trump’s tweets. These projects mainly focus on sentiment analysis and behavior over time. A number of these projects also try to correlate his tweets to external events/factors. For example: [Morales, E.A](https://journals.sagepub.com/doi/full/10.1177/19312431211028610) investigates how Trump’s tweets influence the topics of cable/network television. 

To the best of our knowledge, previous analysis has not focussed on data visualization but instead on statistical evaluation.

Additionally, we are the first project that uses the relatively new Alex Jones’ InfoWars dataset [released on 22 March 2023](https://www.reddit.com/r/datasets/comments/11yyoth/4682_episodes_of_the_alex_jones_show_15875_hours/) and correlates this with Trump’s tweets.

## Milestone 2

Due: 7th May, 5pm  
**10% of the final grade**

### Project Goal

The overarching goal of our data visualization project is to showcase
conspiracy theories spread by far-right political actors and supporters in the
United States. We will put particular focus in the *correlations* between those
conspiracy theories, showcasing how someone inclined to believe in one likely believes
in multiple other ones.
Our dataset is based on a complete list of Donald Trump's tweets before his ban
on Twitter and a transcription of Alex Jones' Infowars show, ranging back until
the early 2000s.

We will describe the different visualization methods and each of the
corresponding subgoals below.

### Visualization Sketches

#### Introduction of Conspiracy Theories via Word Clouds

For each of the two data sets, we will create a word cloud in the shape of the
corresponding actor's head similar to the [example for the Python word\_cloud package](https://github.com/amueller/word_cloud/blob/master/examples/a_new_hope.png).
The word clouds will show the conspiracy theories the two subjects are
referring to in our dataset.
Clicking on a term in the word cloud will bring up an overlay that briefly
explains the term and provides links to further resources about the
corresponding terms.

Furthermore, we will show the correlations between conspiracy theories using
a *chord diagram* built from the covariance matrix of words gathered from 
a word2vec representation of Jones' transcriptions. The chord diagram 
will showcase which conspiracy theories influence each other. The diagram
is 


These links will be vetted to only provide reliable sources such as scientific
publications or neutral, educational content.
The links will _not_ link to blogs or other publications by actors supporting
the conspiracy theories as we want to provide educational visualizations
without supporting the conspiracy theories' further spreading.

This visualization aims to provide an entry point to the web page's visitors
not familiar with the matter at hand.



#### Correlations between Conspiracy Theories via Chord Diagram

We will create a chord diagram where each node corresponds to a term related
to the conspiracy theories brought up in our dataset.
The links between nodes are determined based on contextual use of terms.
We will cluster the graph by strongest links which implies clustering by
conspiracy theories.

The network graph will be divided into two halves, one of them for conspiracy
theories spread by Donald Trump, the other one for topics brought up by Alex
Jones.
While we will clearly distinguish between the two halves, we will also showcase
links between the two halves wherever Donald Trump and Alex Jones bring up the
same conspiracy theories.

The graph will feature a slider below that allows to adjust the time frame
showcased in the current graph.
Due to the abundance of data and in order to highlight development over time,
an instance of the graph will only be based on the data for six months.
The slider allows the viewer to change the time frame for which the graph is
shown.

#### Sankey Diagram of Conspiracy Theory Evoluation

A Sankey diagram will allow us to show how the usage of conspiracy theories in
our dataset evolves over time.
The page visitor will be able to choose a start date and an end date based on
sliders on a timeline.
The Sankey diagram will then show how attention shifted from one set of
conspiracy theories prevalent in our dataset at the beginning of the chosen
time frame to another set of conspiracy theories at the end of the chosen time
frame.

Where the links in the [network graph](#correlations-between-conspiracy-theories-via-chord-diagram)
do not allow the viewer to see at first glance how the focus on certain
theories shifted from one to another, this type of diagram provides us with a
means to do so.

### Tools Used

Since our dataset is heavily text-based, we need to do extensive pre-processing
to extract information for our visualization.
For this purpose, we leverage a Python-based text processing pipeline in which
we tokenize the text dataset and normalize our tokens before creating word
vectors on which we conduct further analysis (such as contextualized
clustering).
Popular libraries used for those purposes are `gensim` and `sklearn`, and our
pipeline also builds around them.

Our visualization will be based on d3.js.
Depending on how our implementation evolves, we will pull in further utility
libraries.
As of now, we however do not already envision other dependencies being pulled
into our project.

For hosting, we will leverage GitHub pages, associated with the GitHub
repository for our project.

### Important Past And Future Lectures

While of course all the basic lectures on d3.js, perception, and design of data
visualization are important as a basis for our project, certain lectures stand
out.

First, the lectures on data and maps (slide decks 4.1, 8.1) introduced
node-link diagrams/network graphs and Sankey diagrams as we envision to use
them in our project.
Second, the lecture on text visualization (slide deck 9) provides us with
information about text processing and visualization that will come in useful
during the further implementation of our project.

For the purposes described above, the upcoming lecture on graph visualization
will also come in useful and provide us with more insights on how to nicely
visualize graphs (here: graphs of words/topics).

## Milestone 3

Due: 4th June, 5pm  
**80% of the final grade**

Please refer to our [report][report] for details on the dataset, design and
implementation of our project.

The screencast for milestone 3 is available at <https://go.epfl.ch/com480-conspiracies-screencast>.


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

[report]: https://github.com/com-480-data-visualization/project-2023-ijustvizzed/blob/master/report/report.pdf
