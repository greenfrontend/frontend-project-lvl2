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

### Example of usage with `json` files
[![asciicast](https://asciinema.org/a/Or3PEVZpX4hZygBYvDAl8LTL3.svg)](https://asciinema.org/a/Or3PEVZpX4hZygBYvDAl8LTL3)

### Example of usage with `yml` files
[![asciicast](https://asciinema.org/a/c8QWfzSsUgrVIPUB43BKNJjit.svg)](https://asciinema.org/a/c8QWfzSsUgrVIPUB43BKNJjit)

### Example of usage with `ini` files
[![asciicast](https://asciinema.org/a/JhgwBFeHTvHmoYcCjkD64p93m.svg)](https://asciinema.org/a/JhgwBFeHTvHmoYcCjkD64p93m)

### Help:

```bash
gendiff -h
```

