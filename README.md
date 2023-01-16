# About Hybi-Galaxy

This is a fork from chatmosphere.cc 

This project should evolve into a tool for theaters, to enable a hybrid stage experience. Working together with the Boat People Project e.V.

To deploy...

1. Build app locally
2. Install netlify-cli
3a. (connect to netlify, only first time) `netlify init`
3b. `netlify deploy --prod`

### Troubleshooting

Netlify does not know, how to handle react-router URL.

Here is the fix: 
https://sung.codes/blog/2018/12/18/page-not-found-on-netlify-with-react-router/
https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps

-> Use _redirects file

## Useful infos

The frontent uses / relies on lib-litsi-meet: https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ljm-api

Find it in /public/lib/

## Setup

### Digital Foyer

Space, where everyone enters. People can move around and watch live-stream. There arealso 1-1 seats.

ROOT/enter

or

ROOT/session/SESSIONNAME

### Beamer View

Special view for back-projection on stage, where all participant video views are projected in a grid.

ROOT/beamer/SESSIONNAME

### Speaker View

Special view for speacker on stage, where only participant on a speaker-vield are shown in a grid-like view.

ROOT/speaker/SESSIONNAME

# Stage view

We use a separate jitsi-server to broadcasting the stage. It is at the time of writing the best compromise we can get to ensure good audio-quality and low-latency stream, because we want to do the webRTC route, instead of RTMP. (RTMP always gave us some seconds delay, no matter what we tried, and we tried a lot. It looks, that by the end of the year, broadcasting via webRTC will be much more supported, because of the community (i.e. OBS-community) discusses this topic a lot at the moment and new techologies are build, like WHIP.)

To ensure a good audio-quality we did the following things

1. Setup an own server, that run an jitsi-instance, that will not get disturbed by the "regular visitors", but will only handle delivering stage audio-and video to foyer participants (that itself will not broadcast any video or audio)

2. Edited the following settings at the jitsi-server: `/etc/jitsi/meet/<domain>-config.js`

```
    enableNoAudioDetection: false,
    enableNoisyMicDetection: false,
    
    opusMaxAverageBitrate: 510000,
    enableOpusRed: true,

    enableLipSync: false,

    disableAP: true,
    disableAEC: true,
    disableNS: true,
    disableAGC: true,
    disableHPF: true,
    stereo: true,
```

For app-stability, we disable p2p mode:
```
    testing: {
        p2pTestMode: true
    }
    
    p2p: {
        enabled: false
    }
```

Do not forget to restart after editing

```
# Restart Services
$ /etc/init.d/jicofo restart && /etc/init.d/jitsi-videobridge2 restart && /etc/init.d/prosody restart
```

# Allow connections in nginx

Edit `nano /etc/nginx/sites-enabled/YOUR-SITE.conf`

Make sure, bosh connections allow all Access Control

```
    # BOSH
    location = /http-bind {
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept';

        proxy_pass       http://localhost:5280/http-bind;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Host $http_host;
    }
```

Again, do not forget to restart after editing:

`systemctl restart nginx`

# Troubleshooting

## Prosody / XMPP

When having problems, connecting to the prosody-service on the backend, please check, if you set the serverUrl-param in the serverConfig.ts. The bosh-param is deprecated. Read more: https://community.jitsi.org/t/issues-setting-up-jitsi-backend-with-lib-jitsi-meet-prosody-get-error-with-focus-server-sending-error-replies-for-1-queued-stanzas-because-of-failed-outgoing-connection-to-focus-undefined/120372/1

## JVB / Auth-Error / See other user, but stream is not recieved

This issue seems to go down, that the jitsi-videobridge component does not seem to have the correnct user-auth credential. A typical error looks like this `tail -F /var/log/jitsi/jvb.log`

```
RetryStrategy$TaskRunner.run#198:     
org.jivesoftware.smack.sasl.SASLErrorException: SASLError using SCRAM-SHA-1: not-authorized
    at org.jivesoftware.smack.SASLAuthentication.authenticationFailed(SASLAuthentication.java:292)
    at org.jivesoftware.smack.tcp.XMPPTCPConnection$PacketReader.parsePackets(XMPPTCPConnection.java:1100)
    at org.jivesoftware.smack.tcp.XMPPTCPConnection$PacketReader.access$300(XMPPTCPConnection.java:1000)
    at org.jivesoftware.smack.tcp.XMPPTCPConnection$PacketReader$1.run(XMPPTCPConnection.java:1016)
    at java.base/java.lang.Thread.run(Thread.java:834)
```

The background is, that the install somehow failed to create the jvb-user with credentials at the prosody-service. To resolve: Get the password of the jvb-user at this file: `/etc/jitsi/videobridge/sip-communicator.properties` -> `org.jitsi.videobridge.xmpp.user.shard.PASSWORD`

The create the prosody user with this command: `prosodyctl passwd jvb@auth.your-server.com`

You will get asked for a password. Enter the password you obtained form `org.jitsi.videobridge.xmpp.user.shard.PASSWORD`

Don't forget to restart all servived again to reflect the changes that were made.

More info: https://community.jitsi.org/t/saslerror-using-scram-sha-1-not-authorized-on-debian-buster-system-with-existing-prosody/26775/1

# Old Readme:

<div align="center" style="border:0 solid #efefef; background-color: #fff; padding:0; margin:0 0 50px 0; color:#333;">
<h1 style="border-bottom:none; margin-bottom:0;">😽 Chatmosphere</h1>
<b>The Open Source Videochat for Cozy Talks</b>
</div>


![Chatmosphere Demo](docs/chatmosphere.gif)

**Chatmosphere is an open source project that aims to make video calls informal and natural**. We missed the dynamics of a self-organizing crowd hanging out at one big table together. The big table in a bar, where so many discussions, jokes, comforting talks, utopias and ideas happen. With chatmosphere you can move and zoom in the area and hear people that are located near by louder and have dynamic talks. To learn more about the Chatmosphere project and ideas have a look in our [ABOUT.md](docs/ABOUT.md)


### Helpful Links
* [How to Run Chatmosphere](docs/INSTALL.md)
* [Contribution Guideline](docs/CONTRIBUTION.md)
* [Find Support here](https://github.com/Chatmosphere/chatmosphere-app/discussions)
* [Code of Conduct for Excellent Humans](docs/CODE_OF_CONDUCT.md)
* [Roadmap](https://www.notion.so/universalinteraction/Chatmosphere-Features-7f32c0b314944c3db99838634f9b3d42)
* [Code License](LICENSE.md)
* [If You Want to Donate You Can Buy Us a Drink](https://www.buymeacoffee.com/chatmosphere)

<!-- 
You can learn more about the awesome Create React App Starter Kit in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).  
To learn more about React, check out the [React documentation](https://reactjs.org/).  
-->
<!-- TODO: write [Shoutout and Fame] -->

### Funded from September 2020 until February 2021 by

<p style="display: flex; flex-direction: row; justify-content: flex-start; align-items: center;">
<a href="https://www.bmbf.de/en/" rel="nofollow"><img src="docs/BMBF-Logo.svg" alt="Logo of the German Ministry for Education and Research" style="max-width:100%; padding:20px;" height="150px"></a>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="https://prototypefund.de/en/" rel="nofollow"><img src="docs/PF-Logo.svg" alt="Logo of the Prototype Fund" style="max-width:100%; padding:20px;" height="150px"></a>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a href="https://okfn.de/en/" rel="nofollow"><img src="docs/OKFD-Logo.svg" alt="Logo of the Open Knowledge Foundation Germany" style="max-width:100%; padding:20px;" height="150px"></a>
</p>
