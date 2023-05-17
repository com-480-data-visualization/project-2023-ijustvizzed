# Conspiracy Theory Wordclous

**Wordcloud Sauce**
https://qliu01.github.io/wordcloud/


**Sources**: 
- [Wikipedia](https://en.wikipedia.org/wiki/List_of_conspiracy_theories_promoted_by_Donald_Trump)
- 


## Conspiracy Theories:

### Birtherism 
(is Obama born in the US?) 

**Alex**:
```
cat transcripts/* | grep -i obama | grep -i birth | wc -l
416
```
**Trump**:
```
cat trump_tweets.txt | grep -i obama | grep -i birth | wc -l
26
```

### Obama + ISIS
(Obama support ISIS)

**Alex**:
```
 cat transcripts/* | grep -i obama | grep ISIS | wc -l
475
```
**Trump**:
```
cat trump_tweets.txt | grep -i obama | grep ISIS | wc -l
38
```

### Epstein didn't kill himself
https://en.wikipedia.org/wiki/Epstein_didn%27t_kill_himself

**Alex**:
```
 cat transcripts/* | grep -i epstein | grep -i jeff | grep -i suicide | wc -l
24
```

**Trump**
```
cat trump_tweets.txt | grep -i epstein | grep -i jeff | wc -l
3
```

### Cruz Familiy involived in murder of Kennedy

**Alex**
```
 cat transcripts/* | grep -i Cruz | grep -i Kennedy | wc -l
4
```

**Trump** (none found)

### Deep State
https://en.wikipedia.org/wiki/Deep_state_in_the_United_States#Deep_State_and_Donald_Trump

**Alex**
```
 cat transcripts/* | grep -i "deep state" | wc -l
9233
```

**Trump**
```
cat trump_tweets.txt | grep -i "deep state" | wc -l
40
```

### QAnon
https://en.wikipedia.org/wiki/QAnon

**Alex**
```
 cat transcripts/* | grep -i "Qanon" | wc -l
445
```

**Trump**
```
cat trump_tweets.txt | grep -i QAnon | wc -l
2 
```

### Rigged 2020 Election
https://en.wikipedia.org/wiki/Big_lie#Donald_Trump's_false_claims_of_a_stolen_election

**Alex**
```
 cat transcripts/* | grep -i rigged | grep -i stolen  | grep -i election | wc -l
16
```

**Trump**
```
 cat trump_tweets.txt | grep -i rigged | grep -i election | wc -l
81
```

### Covid 19 Deaths
https://en.wikipedia.org/wiki/COVID-19_misinformation#Allegations_of_inflated_death_counts

**Alex**
```
cat transcripts/* | grep -i covid | grep -i death | wc -l
1229
```

**Trump**
```
 cat trump_tweets.txt | grep -i covid | grep -i death | wc -l
12
```

### Global Warming
https://en.wikipedia.org/wiki/Climate_change_conspiracy_theory

**Alex**
```
 cat transcripts/* | grep -i global | grep -i warming | wc -l
5232
```

**Trump**
```
cat trump_tweets.txt | grep -i warming | grep -i global | wc -l
113
```

### Vaccine Autism
https://en.wikipedia.org/wiki/Vaccines_and_autism#Celebrity_involvement

**Alex**
```
cat transcripts/* | grep -i vaccine | grep -i autism | wc -l
327
```

**Trump**
```
 cat trump_tweets.txt | grep -i vaccine | grep -i autism | wc -l
9
```

### 9/11

**Alex**
```
 cat transcripts/* | grep -i 9/11  | wc -l
111
```

**Trump**
```
 cat trump_tweets.txt | grep -i 9/11 | wc -l
39
```

### Antifa Soros

**Alex**
```
 cat transcripts/* | grep -i antifa | grep -i soros | wc -l
162
```

**Trump**
```
cat trump_tweets.txt | grep -i antifa | grep -i soros | wc -l
1
```

