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
