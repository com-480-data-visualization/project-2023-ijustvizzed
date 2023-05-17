.PHONY: all clean

SOURCES = $(wildcard *.md)
TARGETS = $(SOURCES:%.md=%.html)

all: $(TARGETS)

%.html: %.md
	@pandoc --from=markdown --to=html --output=$@ $<

clean:
	-rm -f $(TARGETS)
