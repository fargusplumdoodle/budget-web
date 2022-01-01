#!/bin/bash
exit $(node ./node_modules/eslint/bin/eslint.js . | wc -l)
