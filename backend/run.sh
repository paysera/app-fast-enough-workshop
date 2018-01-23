#!/usr/bin/env bash

composer install
bin/console server:run 0.0.0.0:8888
