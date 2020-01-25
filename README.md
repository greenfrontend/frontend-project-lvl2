# frontend-project-lvl2

[![Maintainability](https://api.codeclimate.com/v1/badges/cc3a719f829516de1bc5/maintainability)](https://codeclimate.com/github/greenfrontend/frontend-project-lvl2/maintainability)
[![Build Status](https://travis-ci.org/greenfrontend/frontend-project-lvl2.svg?branch=master)](https://travis-ci.org/greenfrontend/frontend-project-lvl2)

### Compares two configuration files and shows a difference.

### Install

```bash
sudo npm i -g difference-greenfrontend
```

### Use as CLI

```bash
gendiff [options] <firstConfig> <secondConfig>
```

### Use as library

```javascript
import genDiff from 'difference-greenfrontend';

const diff = genDiff(pathToFile1, pathToFile2);

console.log(diff);
```

### Example of usage with flat `json` files
[![asciicast](https://asciinema.org/a/Or3PEVZpX4hZygBYvDAl8LTL3.svg)](https://asciinema.org/a/Or3PEVZpX4hZygBYvDAl8LTL3)

### Example of usage with flat `yml` files
[![asciicast](https://asciinema.org/a/c8QWfzSsUgrVIPUB43BKNJjit.svg)](https://asciinema.org/a/c8QWfzSsUgrVIPUB43BKNJjit)

### Example of usage with flat `ini` files
[![asciicast](https://asciinema.org/a/JhgwBFeHTvHmoYcCjkD64p93m.svg)](https://asciinema.org/a/JhgwBFeHTvHmoYcCjkD64p93m)

### Example of usage with recursive format
[![asciicast](https://asciinema.org/a/ORozt8XjL0HPtTLOM2gS7W42T.svg)](https://asciinema.org/a/ORozt8XjL0HPtTLOM2gS7W42T)

### Example of usage with plane format
[![asciicast](https://asciinema.org/a/LcMyBN8KxEqPgo7RB3FO319U9.svg)](https://asciinema.org/a/LcMyBN8KxEqPgo7RB3FO319U9)

### Example of usage with json format
[![asciicast](https://asciinema.org/a/SJB822db6INiAWeNqRJ7wowv1.svg)](https://asciinema.org/a/SJB822db6INiAWeNqRJ7wowv1)

### Help:

```bash
gendiff -h
```

