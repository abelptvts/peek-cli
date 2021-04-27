# Peek CLI 👀

Command line interface for [Peek](https://github.com/abelptvts/peek).

## Installation

```
$ npm i -g peek-cli
```

## Usage

The simplest way to get started is to pass the signaling service url and password through env variables and just specify the services to subscribe to.

```
export PEEK_SIGNALING_URL=https://signaling.example.com
export PEEK_SECRET=*****
$ peek -s service1 service2
```

Access the help for the full list of options.

```
$ peek -h
Usage: peek [options]

Options:
  -V, --version                     output the version number
  --signaling-url <url>             URL of the signaling service (default: "http://localhost:3000")
  -s, --subscriptions <service...>  services to subscribe to
  --secret <password>               shared secret (default: "suchsecret")
  -t, --topic-prefix <prefix>       filter messages by this topic prefix (default: null)
  -h, --help                        display help for command
```

Peek will print the received values to stdout in CSV format, e.g.
```
Service, Timestamp, Topic, Message
service1, 2021-04-27T20:14:00.331Z, 'this:is:a:topic', 'Such message, wow'
```