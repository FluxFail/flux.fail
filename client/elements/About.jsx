import React from 'react';

const About = () => (
  <div className="w3-center">
    <h1>About flux.fail</h1>

    <h2>Imprint</h2>
    <p>
      This service is brought to you by: <br /><br />
      <b><i>flux.fail Holding UG (haftungsbeschränkt) &amp; Service KG</i></b><br />
      Glogauerstr. 21<br />
      10999 Berlin
    </p>

    <hr />

    <h2>Data Privacy Statement</h2>
    <p>
      In order to sign up for an account at this site, users have to state a
      valid e-mail address, which the site temporarily saves and uses to send
      out a login link that is valid once within 24 hours. If clicked, this
      site will be opened in a browser and an authentication cookie will be
      set inside that browser. This cookie keeps the browser authenticated
      with the site, refreshes every time the user uses the site (i.e
      navigates around) and is valid for a period of max. 7 days if the site
      isn{"'"}t visited at all. Once authenticated, the site deletes the
      user{"'"}s e-mail address from the database and instead saves the SHA256
      of the user{"'"}s e-mail address. This SHA256 is then used to identify
      the user and reference reported delays to browser sessions. The database
      of this site basically consists of a single table containing delays
      reported by some cryptic SHA256 hashes.
    </p>
    <p>
      Other than that, the site neither collects nor stores any personal and/or
      private information or data points of the user(s), unless they explicitly
      decides to provide these optional infos. If the user decides to do so,
      the given information will be used solely to provide the services this
      site is intended for.
    </p>
    <p>
      The complete source code of this site is open-source and freely
      and publicly available at&nbsp;
      <a
        href="https://github.com/FluxFail/flux.fail"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>.
    </p>
  </div>
);

export default About;
