TARGET = report
DOCKER ?= sudo docker
PANDOC_ARGS = --from=markdown --to=pdf --filter=pandoc-crossref --citeproc --bibliography=$(TARGET).bib --listings --verbose
UID := $(shell id -u)
GID := $(shell id -g)

.PHONY: all clean

all: $(TARGET).pdf

$(TARGET).pdf: $(TARGET).md $(TARGET).bib
	@$(DOCKER) run --rm -v "$(shell pwd)":/data -u $(UID):$(GID) pandoc/extra:edge \
		$(PANDOC_ARGS) -o $@ $<

clean:
	-rm -f $(TARGET).pdf
